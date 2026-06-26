import { Router } from "express";
import { db, reviewsTable } from "@workspace/db";
import { eq, inArray } from "drizzle-orm";
import { FEATURED_TOOLS, TOOLS_BY_CATEGORY, CATEGORIES } from "../constants";

const router = Router();

const ALL_TOOLS = [...FEATURED_TOOLS, ...Object.values(TOOLS_BY_CATEGORY).flat()];
const uniqueTools = Array.from(new Map(ALL_TOOLS.map((t) => [t.slug, t])).values());

router.get("/tools", async (req, res) => {
  const category = req.query.category as string | undefined;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
  const search = req.query.search as string | undefined;
  const offset = (page - 1) * limit;

  let tools = uniqueTools;
  if (category) {
    tools = tools.filter((t) => t.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    tools = tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }

  const pagedTools = tools.slice(offset, offset + limit);
  const slugs = pagedTools.map((t) => t.slug);

  let statsBySlug: Record<string, { avgRating: number; totalReviews: number }> = {};

  if (slugs.length > 0) {
    const data = await db
      .select({ toolSlug: reviewsTable.toolSlug, rating: reviewsTable.rating })
      .from(reviewsTable)
      .where(inArray(reviewsTable.toolSlug, slugs));

    for (const row of data) {
      if (!statsBySlug[row.toolSlug]) {
        statsBySlug[row.toolSlug] = { avgRating: 0, totalReviews: 0 };
      }
      statsBySlug[row.toolSlug].totalReviews += 1;
      statsBySlug[row.toolSlug].avgRating += row.rating;
    }
    for (const slug of Object.keys(statsBySlug)) {
      const s = statsBySlug[slug];
      s.avgRating = s.totalReviews > 0 ? s.avgRating / s.totalReviews : 0;
    }
  }

  const result = pagedTools.map((tool) => {
    const stats = statsBySlug[tool.slug] || { avgRating: tool.avgRating, totalReviews: tool.totalReviews };
    return {
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      longDescription: tool.longDescription ?? null,
      category: tool.category,
      websiteUrl: tool.websiteUrl ?? null,
      githubUrl: tool.githubUrl ?? null,
      avgRating: stats.totalReviews > 0 ? Number(stats.avgRating.toFixed(1)) : tool.avgRating,
      totalReviews: stats.totalReviews || tool.totalReviews,
    };
  });

  res.json({
    tools: result,
    pagination: {
      page,
      limit,
      total: tools.length,
      totalPages: Math.ceil(tools.length / limit),
    },
  });
});

router.get("/tools/:slug", async (req, res) => {
  const { slug } = req.params;
  const tool = uniqueTools.find((t) => t.slug === slug);

  if (!tool) {
    res.status(404).json({ error: "Tool not found" });
    return;
  }

  const data = await db
    .select({ rating: reviewsTable.rating })
    .from(reviewsTable)
    .where(eq(reviewsTable.toolSlug, slug));

  const totalReviews = data.length;
  const avgRating =
    totalReviews > 0
      ? Number((data.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1))
      : tool.avgRating;

  res.json({
    tool: {
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      longDescription: tool.longDescription ?? null,
      category: tool.category,
      websiteUrl: tool.websiteUrl ?? null,
      githubUrl: tool.githubUrl ?? null,
      avgRating,
      totalReviews: totalReviews || tool.totalReviews,
    },
  });
});

router.get("/tools/:slug/reviews", async (req, res) => {
  const { slug } = req.params;

  const reviews = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.toolSlug, slug));

  res.json({
    reviews: reviews.map((r) => ({
      id: String(r.id),
      toolSlug: r.toolSlug,
      authorUsername: r.authorUsername,
      authorAvatar: r.authorAvatar ?? null,
      rating: r.rating,
      title: r.title,
      content: r.content,
      createdAt: r.createdAt.toISOString(),
      upvotes: r.upvotes,
    })),
    pagination: {
      page: 1,
      limit: 100,
      total: reviews.length,
      totalPages: 1,
    },
  });
});

router.get("/categories", async (_req, res) => {
  const categoriesWithCounts = CATEGORIES.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    icon: c.icon,
    toolCount: (TOOLS_BY_CATEGORY[c.slug as keyof typeof TOOLS_BY_CATEGORY] || []).length,
  }));

  res.json({ categories: categoriesWithCounts });
});

router.get("/stats", async (_req, res) => {
  const totalTools = uniqueTools.length;
  const reviews = await db.select({ id: reviewsTable.id }).from(reviewsTable);
  const totalReviews = reviews.length;
  const totalCategories = CATEGORIES.length;

  res.json({ totalTools, totalReviews, totalCategories });
});

export default router;
