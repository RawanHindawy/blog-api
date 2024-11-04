import type { Context } from "hono";
import * as commentModel from "../models/comment-model.ts";
import { errorHandler } from "../middleware/error-middleware";

export const getAllComments = async (c: Context) => {
  const comments = await commentModel.getAllComments();
  return c.json(comments, 200);
};

export const getCommentById = async (c: Context) => {
  const id = c.req.param("id");
  const comment = await commentModel.getCommentById(id);

  if (!comment) {
    return c.json({ error: "Comment not found" }, 404);
  }

  return c.json(comment, 200);
};

export const createComment = async (c: Context) => {
  const body = await c.req.json();
  const {userId} = c.get("user");
  const newComment = await commentModel.createComment(body,userId);
  return c.json(newComment, 201);
};

export const updateComment = async (c: Context) => {
  const id = c.req.param("id");
  const { userId } = c.get('user') ?? 0;
  const body = await c.req.json();

  const updatedComment = await commentModel.updateComment(id, userId, body);

  if (!updatedComment) {
    return c.json({ error: "Comment not found" }, 404);
  }

  return c.json(updatedComment, 200);
};

export const deleteComment = async (c: Context) => {
  try{
    const id = c.req.param("id");
    const { userId } = c.get('user') ?? 0;
    await commentModel.deleteComment(id,userId);

    return c.json({ message: "Comment deleted successfully" }, 200);
  }catch (error){
    return errorHandler(error as Error, c);
  }
};
