import { pgTable, text, integer, timestamp, serial, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reviewsTable = pgTable("reviews", {
  id: serial("id").primaryKey(),
  toolSlug: text("tool_slug").notNull(),
  authorUsername: text("author_username").notNull(),
  authorAvatar: text("author_avatar"),
  rating: integer("rating").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  upvotes: integer("upvotes").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
},
(table) => [
  unique("uniq_review_per_user_tool").on(table.toolSlug, table.authorUsername),
]);

export const reviewVotesTable = pgTable("review_votes", {
  id: serial("id").primaryKey(),
  reviewId: integer("review_id").notNull().references(() => reviewsTable.id, { onDelete: "cascade" }),
  voterUsername: text("voter_username").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
},
(table) => [
  unique("uniq_vote_per_user_review").on(table.reviewId, table.voterUsername),
]);

export const insertReviewSchema = createInsertSchema(reviewsTable).omit({ id: true, createdAt: true, updatedAt: true, upvotes: true });
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviewsTable.$inferSelect;
export type ReviewVote = typeof reviewVotesTable.$inferSelect;
