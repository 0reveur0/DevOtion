import { Router } from "express";
import { db, reviewsTable, reviewVotesTable } from "@workspace/db";
import { eq, sql, and } from "drizzle-orm";

const router = Router();

function formatReview(r: typeof reviewsTable.$inferSelect) {
  return {
    id: String(r.id),
    toolSlug: r.toolSlug,
    authorUsername: r.authorUsername,
    authorAvatar: r.authorAvatar ?? null,
    rating: r.rating,
    title: r.title,
    content: r.content,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
    upvotes: r.upvotes,
  };
}

/** GET /reviews?toolSlug=&page=&limit= */
router.get("/reviews", async (req, res) => {
  const toolSlug = req.query.toolSlug as string | undefined;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
  const offset = (page - 1) * limit;

  const allReviews = await db
    .select()
    .from(reviewsTable)
    .where(toolSlug ? eq(reviewsTable.toolSlug, toolSlug) : undefined);

  const paged = allReviews.slice(offset, offset + limit);

  res.json({
    reviews: paged.map(formatReview),
    pagination: {
      page,
      limit,
      total: allReviews.length,
      totalPages: Math.ceil(allReviews.length / limit),
    },
  });
});

/** POST /reviews — create a review; one per user per tool */
router.post("/reviews", async (req, res) => {
  const { toolSlug, authorUsername, authorAvatar, rating, title, content } = req.body;

  if (!toolSlug || !authorUsername || !rating || !title || !content) {
    res.status(400).json({ error: "Missing required fields: toolSlug, authorUsername, rating, title, content" });
    return;
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    res.status(400).json({ error: "Rating must be a number between 1 and 5" });
    return;
  }

  // Enforce one review per user per tool
  const existing = await db
    .select({ id: reviewsTable.id })
    .from(reviewsTable)
    .where(and(eq(reviewsTable.toolSlug, toolSlug), eq(reviewsTable.authorUsername, authorUsername)));

  if (existing.length > 0) {
    res.status(409).json({ error: "You have already submitted a review for this tool" });
    return;
  }

  const [review] = await db
    .insert(reviewsTable)
    .values({
      toolSlug,
      authorUsername,
      authorAvatar: authorAvatar ?? null,
      rating: Number(rating),
      title,
      content,
    })
    .returning();

  res.status(201).json({ review: formatReview(review) });
});

/** GET /reviews/:id */
router.get("/reviews/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid review ID" });
    return;
  }

  const [review] = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.id, id));

  if (!review) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  res.json({ review: formatReview(review) });
});

/** PATCH /reviews/:id — update own review (owner-only) */
router.patch("/reviews/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid review ID" });
    return;
  }

  const { authorUsername, rating, title, content } = req.body;

  if (!authorUsername) {
    res.status(400).json({ error: "authorUsername is required to verify ownership" });
    return;
  }

  const [existing] = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.id, id));

  if (!existing) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  if (existing.authorUsername !== authorUsername) {
    res.status(403).json({ error: "You can only edit your own reviews" });
    return;
  }

  const updates: Partial<{ rating: number; title: string; content: string; updatedAt: Date }> = {
    updatedAt: new Date(),
  };

  if (rating !== undefined) {
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      res.status(400).json({ error: "Rating must be a number between 1 and 5" });
      return;
    }
    updates.rating = rating;
  }

  if (title !== undefined) updates.title = title;
  if (content !== undefined) updates.content = content;

  const [updated] = await db
    .update(reviewsTable)
    .set(updates)
    .where(eq(reviewsTable.id, id))
    .returning();

  res.json({ review: formatReview(updated) });
});

/** DELETE /reviews/:id — delete own review (owner-only) */
router.delete("/reviews/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid review ID" });
    return;
  }

  const authorUsername = (req.body?.authorUsername as string) || (req.query.authorUsername as string);

  if (!authorUsername) {
    res.status(400).json({ error: "authorUsername is required to verify ownership" });
    return;
  }

  const [existing] = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.id, id));

  if (!existing) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  if (existing.authorUsername !== authorUsername) {
    res.status(403).json({ error: "You can only delete your own reviews" });
    return;
  }

  await db.delete(reviewsTable).where(eq(reviewsTable.id, id));

  res.status(204).send();
});

/** POST /reviews/:id/upvote — vote for a review (no self-vote, no duplicate votes) */
router.post("/reviews/:id/upvote", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid review ID" });
    return;
  }

  const { voterUsername } = req.body;

  if (!voterUsername) {
    res.status(400).json({ error: "voterUsername is required" });
    return;
  }

  const [review] = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.id, id));

  if (!review) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  // Prevent self-voting
  if (review.authorUsername === voterUsername) {
    res.status(403).json({ error: "You cannot upvote your own review" });
    return;
  }

  // Prevent duplicate votes
  const existingVote = await db
    .select({ id: reviewVotesTable.id })
    .from(reviewVotesTable)
    .where(and(eq(reviewVotesTable.reviewId, id), eq(reviewVotesTable.voterUsername, voterUsername)));

  if (existingVote.length > 0) {
    res.status(409).json({ error: "You have already upvoted this review" });
    return;
  }

  // Record vote and increment counter atomically
  await db.insert(reviewVotesTable).values({ reviewId: id, voterUsername });

  const [updated] = await db
    .update(reviewsTable)
    .set({ upvotes: sql`${reviewsTable.upvotes} + 1` })
    .where(eq(reviewsTable.id, id))
    .returning({ upvotes: reviewsTable.upvotes });

  res.json({ upvotes: updated.upvotes });
});

/** DELETE /reviews/:id/upvote — remove a previously cast vote */
router.delete("/reviews/:id/upvote", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid review ID" });
    return;
  }

  const voterUsername = (req.body?.voterUsername as string) || (req.query.voterUsername as string);

  if (!voterUsername) {
    res.status(400).json({ error: "voterUsername is required" });
    return;
  }

  const [review] = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.id, id));

  if (!review) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  const [existingVote] = await db
    .select()
    .from(reviewVotesTable)
    .where(and(eq(reviewVotesTable.reviewId, id), eq(reviewVotesTable.voterUsername, voterUsername)));

  if (!existingVote) {
    res.status(404).json({ error: "Vote not found — you haven't upvoted this review" });
    return;
  }

  await db.delete(reviewVotesTable).where(eq(reviewVotesTable.id, existingVote.id));

  const [updated] = await db
    .update(reviewsTable)
    .set({ upvotes: sql`GREATEST(${reviewsTable.upvotes} - 1, 0)` })
    .where(eq(reviewsTable.id, id))
    .returning({ upvotes: reviewsTable.upvotes });

  res.json({ upvotes: updated.upvotes });
});

export default router;
