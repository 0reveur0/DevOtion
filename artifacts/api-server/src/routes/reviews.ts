import { Router } from "express";
import { db, reviewsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router = Router();

router.post("/reviews", async (req, res) => {
  const { toolSlug, authorUsername, rating, title, content } = req.body;

  if (!toolSlug || !authorUsername || !rating || !title || !content) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  if (rating < 1 || rating > 5) {
    res.status(400).json({ error: "Rating must be between 1 and 5" });
    return;
  }

  const [review] = await db
    .insert(reviewsTable)
    .values({
      toolSlug,
      authorUsername,
      rating: Number(rating),
      title,
      content,
    })
    .returning();

  res.status(201).json({
    id: String(review.id),
    toolSlug: review.toolSlug,
    authorUsername: review.authorUsername,
    authorAvatar: review.authorAvatar ?? null,
    rating: review.rating,
    title: review.title,
    content: review.content,
    createdAt: review.createdAt.toISOString(),
    upvotes: review.upvotes,
  });
});

router.get("/reviews/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(404).json({ error: "Review not found" });
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

  res.json({
    id: String(review.id),
    toolSlug: review.toolSlug,
    authorUsername: review.authorUsername,
    authorAvatar: review.authorAvatar ?? null,
    rating: review.rating,
    title: review.title,
    content: review.content,
    createdAt: review.createdAt.toISOString(),
    upvotes: review.upvotes,
  });
});

router.post("/reviews/:id/upvote", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  const [updated] = await db
    .update(reviewsTable)
    .set({ upvotes: sql`${reviewsTable.upvotes} + 1` })
    .where(eq(reviewsTable.id, id))
    .returning({ upvotes: reviewsTable.upvotes });

  if (!updated) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  res.json({ upvotes: updated.upvotes });
});

export default router;
