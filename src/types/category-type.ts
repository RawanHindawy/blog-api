import { categories } from "../db/schema";
import type { Post } from "./post-type";

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type CategoryWithPosts = Category & {
  posts: Post[];
};
