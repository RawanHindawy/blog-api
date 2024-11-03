import { eq } from "drizzle-orm";
import db from "../db";
import { posts } from "../db/schema";
// import { categories } from '../db/schemas/category-schema';
// import { comments } from '../db/schemas/comment-schema';
// import { postsTags } from '../db/schemas/post-tags-schema';
// import { tags } from '../db/schemas/tag-schema';

import type { Post, NewPost } from "../types/post-type";

export const getAllPosts = async (): Promise<Post[]> => {
  return await db.select().from(posts);
};

export const getPostById = async (id: string): Promise<Post | undefined> => {
  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.id, parseInt(id)))
    .limit(1);

  return result[0];
};

export const createPost = async (data: NewPost): Promise<Post> => {
  const result = await db.insert(posts).values(data).returning();

  return result[0];
};

export const updatePost = async (
  id: string,
  data: Partial<NewPost>
): Promise<Post | undefined> => {
  const result = await db
    .update(posts)
    .set(data)
    .where(eq(posts.id, parseInt(id)))
    .returning();

  return result[0];
};

export const deletePost = async (id: string): Promise<boolean> => {
  const result = await db
    .delete(posts)
    .where(eq(posts.id, parseInt(id)))
    .returning();

  return result.length === 1;
};

// export const getPostWithRelations = async (id: string): Promise<Post | undefined> => {
//     const result = await db.query.posts.findFirst({
//         where: eq(posts.id, parseInt(id)),
//         with: {
//             category: true,
//             comments: true,
//             tags: {
//                 with: {
//                     tag: true
//                 }
//             }
//         }
//     });

//     return result;
// };

// export const getAllPostsWithRelations = async (): Promise<Post[]> => {
//     return await db.query.posts.findMany({
//         with: {
//             category: true,
//             comments: true,
//             tags: {
//                 with: {
//                     tag: true
//                 }
//             }
//         }
//     });
// };

// export const addTagToPost = async (postId: string, tagId: number): Promise<void> => {
//     await db.insert(postsTags).values({
//         postId: parseInt(postId),
//         tagId: tagId
//     });
// };

// export const removeTagFromPost = async (postId: string, tagId: number): Promise<void> => {
//     await db
//         .delete(postsTags)
//         .where(
//             and(
//                 eq(postsTags.postId, parseInt(postId)),
//                 eq(postsTags.tagId, tagId)
//             )
//         );
// };
