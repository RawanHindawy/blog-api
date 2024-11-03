import { tags } from "../db/schemas/tag-schema";
import type { Post } from "./post-type";

export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;

export type TagWithPosts = Tag & {
  posts: Post[];
};
