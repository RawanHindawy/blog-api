import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { posts } from "./post-schema";
// import { relations } from 'drizzle-orm';

export const comments = pgTable("comments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  postId: integer("post_id").references(() => posts.id),
  // userId: integer('user_id').notNull().references(() => users.id)
});

// export const commentsRelations = relations(comments, ({ one }) => ({
//   user: one(users, {
//     fields: [comments.userId],
//     references: [users.id],
//   }),
//   post: one(posts, {
//     fields: [comments.postId],
//     references: [posts.id],
//   }),
// }));
