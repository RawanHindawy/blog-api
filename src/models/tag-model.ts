import { eq } from "drizzle-orm";
import db from "../db";
import { tags } from "../db/schema";
import type { Tag, NewTag } from "../types/tag-type";
// import { postsTags } from '../db/schemas/post-tags-schema';
// import { posts } from '../db/schemas/post-schema';

export const getAllTags = async (): Promise<Tag[]> => {
  return await db.select().from(tags);
};

export const getTagById = async (id: number): Promise<Tag | undefined> => {
  const result = await db.select().from(tags).where(eq(tags.id, id)).limit(1);

  return result[0];
};

export const createTag = async (tagData: NewTag): Promise<Tag> => {
  const result = await db.insert(tags).values(tagData).returning();

  return result[0];
};

export const updateTag = async (
  id: number,
  tagData: Partial<NewTag>
): Promise<Tag | undefined> => {
  const result = await db
    .update(tags)
    .set(tagData)
    .where(eq(tags.id, id))
    .returning();

  return result[0];
};

export const deleteTag = async (id: number): Promise<boolean> => {
  const result = await db.delete(tags).where(eq(tags.id, id)).returning();

  return result.length === 1;
};

// export const getTagWithPosts = async (id: number): Promise<Tag | undefined> => {
//   const result = await db.query.tags.findFirst({
//     where: eq(tags.id, id),
//     with: {
//       posts: {
//         with: {
//           post: true
//         }
//       }
//     }
//   });

//   return result;
// };

// export const getPostsByTagId = async (tagId: number): Promise<Post[]> => {
//   const result = await db.query.postsTags.findMany({
//     where: eq(postsTags.tagId, tagId),
//     with: {
//       post: true
//     }
//   });

//   return result.map(pt => pt.post);
// };
