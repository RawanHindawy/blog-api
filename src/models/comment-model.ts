import { eq } from "drizzle-orm";
import db from "../db";
import { comments } from "../db/schemas/comment-schema";
import type { Comment, NewComment } from "../types/comment-type";

export const getAllComments = async (): Promise<Comment[]> => {
  return await db.select().from(comments);
};

export const getCommentById = async (
  id: string
): Promise<Comment | undefined> => {
  const result = await db
    .select()
    .from(comments)
    .where(eq(comments.id, parseInt(id)))
    .limit(1);

  return result[0];
};

export const createComment = async (data: NewComment): Promise<Comment> => {
  const result = await db.insert(comments).values(data).returning();

  return result[0];
};

export const updateComment = async (
  id: string,
  data: Partial<NewComment>
): Promise<Comment | undefined> => {
  const result = await db
    .update(comments)
    .set(data)
    .where(eq(comments.id, parseInt(id)))
    .returning();

  return result[0];
};

export const deleteComment = async (id: string): Promise<boolean> => {
  const result = await db
    .delete(comments)
    .where(eq(comments.id, parseInt(id)))
    .returning();

  return result.length === 1;
};

// export const getCommentWithPost = async (id: string): Promise<Comment | undefined> => {
//     const result = await db.query.comments.findFirst({
//         where: eq(comments.id, parseInt(id)),
//         with: {
//             post: true
//         }
//     });

//     return result;
// };

// export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
//     return await db.query.comments.findMany({
//         where: eq(comments.postId, parseInt(postId))
//     });
// };
