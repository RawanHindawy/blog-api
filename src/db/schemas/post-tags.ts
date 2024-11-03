import { pgTable, integer, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { posts } from "./post-schema";
import { tags } from "./tag-schema";

export const postsToTags = pgTable(
  "posts_to_tags",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.tagId] }),
    };
  }
);
