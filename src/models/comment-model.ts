import { eq } from "drizzle-orm";
import db from "../db";
import { comments } from "../db/schema";
import type { Comment, NewComment } from "../types/comment-type";
import { HTTPException } from "hono/http-exception";

export const getAllComments = async (queryParams: Record<string, string>): Promise<{ data: Comment[], pagination: { totalPages: number, currentPage: number } }> => {
  
  const page = parseInt(queryParams.page) || 1;
  const pageSize = parseInt(queryParams.pageSize) || 10;
  const skip = (page - 1) * pageSize;

  const commentsResult = await db.query.comments.findMany({
    with: {
      user: true
    },
    limit: pageSize,
    offset: skip
  });

  const commentsCount = await db.select({ count: comments.id }).from(comments).then(result => Number(result[0].count));

  return { data: commentsResult, pagination: { totalPages: Math.ceil(commentsCount / pageSize), currentPage: page } };
};

export const getCommentById = async (
  id: string
): Promise<Comment | undefined> => {
  const result = await db.query.comments.findFirst({
    where: eq(comments.id, parseInt(id)),
    with: {
      user: true
    }
  });

  return result;
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
