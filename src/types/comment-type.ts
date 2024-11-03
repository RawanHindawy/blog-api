import { comments } from "../db/schemas/comment-schema";
import type { Post } from "./post-type";

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;

export type CommentWithPost = Comment & {
  post: Post;
};
