import type { Context } from "hono";
import * as postModel from "../models/post-model";

export const getAllPosts = async (c: Context) => {
  const posts = await postModel.getAllPosts();
  return c.json(posts, 200);
};

export const getPostById = async (c: Context) => {
  const id = c.req.param("id");
  const post = await postModel.getPostById(id);

  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  return c.json(post, 200);
};

export const createPost = async (c: Context) => {
  const body = await c.req.json();
  const post = await postModel.createPost(body);
  return c.json(post, 201);
};

export const updatePost = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const post = await postModel.updatePost(id, body);

  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  return c.json(post, 200);
};

export const deletePost = async (c: Context) => {
  const id = c.req.param("id");
  const success = await postModel.deletePost(id);

  if (!success) {
    return c.json({ error: "Post not found" }, 404);
  }

  return c.json({ message: "Post deleted successfully" }, 200);
};
