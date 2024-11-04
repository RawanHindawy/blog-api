import { eq } from "drizzle-orm";
import db from "../db";
import { comments } from "../db/schema";
import type { Comment, NewComment } from "../types/comment-type";
import { HTTPException } from "hono/http-exception";

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

export const createComment = async (data: NewComment, userId: number): Promise<Comment> => {
  const result = await db.insert(comments).values({...data,userId}).returning();

  return result[0];
};

export const updateComment = async (
  id: string, userId:number,
  data: Partial<NewComment>
): Promise<Comment | undefined> => {
  const comment = await getCommentById(id);

  if (comment){
    if (comment.userId !== userId) {
      throw new HTTPException(403, { message: "You are not authorized to update this comment" });
    }

    const result = await db
      .update(comments)
      .set(data)
      .where(eq(comments.id, parseInt(id)))
      .returning();

    return result[0];
  } else {
    throw new HTTPException(404, { message: "Comment not found" });
  }
};

export const deleteComment = async (id: string, userId:number): Promise<boolean> => {
  const comment = await getCommentById(id);

  if (comment){
    if (comment.userId !== userId) {
      throw new HTTPException(403, { message: "You are not authorized to delete this comment" });
    }
  await db
    .delete(comments)
    .where(eq(comments.id, parseInt(id)))
    .returning();

    return true;
  }else {
    throw new HTTPException(404, { message: "Comment not found" });
  }
};
