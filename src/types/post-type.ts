import { posts } from "../db/schema";
import type { Category } from "./category-type";
import type { Comment } from "./comment-type";

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export type PostWithCategory = Post & {
  category: Category;
};

export type PostWithComments = Post & {
  comments: Comment[];
};

export type PostWithRelations = Post & {
  category: Category;
  comments: Comment[];
};
