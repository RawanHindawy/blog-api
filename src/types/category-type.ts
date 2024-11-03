import { categories } from "../db/schemas/category-schema";
import type { Post } from "./post-type";

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type CategoryWithPosts = Category & {
  posts: Post[];
};
