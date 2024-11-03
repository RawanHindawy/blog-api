import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { categories } from "./category-schema";
// import { postsToTags } from './post-tags';
// import { relations } from 'drizzle-orm';
// import { comments } from './comment-schema';
// import { postsTags } from './post-tags-schema';

export const posts = pgTable("posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // userId: integer('user_id').notNull().references(() => users.id),
  categoryId: integer("category_id").references(() => categories.id),
});

// export const postsRelations = relations(posts, ({ one, many }) => ({
//   category: one(categories, {
//     fields: [posts.categoryId],
//     references: [categories.id],
//   }),
//   comments: many(comments),
//   tags: many(postsTags)
// }));

// export const postsRelations = relations(posts, ({ one, many }) => ({
//   user: one(users, {
//     fields: [posts.userId],
//     references: [users.id],
//   }),
//   category: one(categories, {
//     fields: [posts.categoryId],
//     references: [categories.id],
//   }),
//   comments: many(comments),
//   tags: many(postsToTags, {
//     through: postsToTags,
//     fields: [posts.id],
//     references: [postsToTags.postId],
//   }),
// }));
