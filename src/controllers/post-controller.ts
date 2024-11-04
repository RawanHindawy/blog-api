import type { Context } from "hono";
import * as postModel from "../models/post-model";
import { errorHandler } from "../middleware/error-middleware";
import redisClient from "../config/redis";

export const getAllPosts = async (c: Context) => {
  // check cached
  const cached = await redisClient.get("posts")
  const parseCached = cached ? JSON.parse(cached) : []
  if (parseCached.length > 0) return c.json(parseCached, 200)
  const posts = await postModel.getAllPosts(c.req.query());
  redisClient.set("posts", JSON.stringify(posts), { EX: 60 });
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
  const { userId } = c.get("user");
  const post = await postModel.createPost(body, userId);
  redisClient.del("posts")
  return c.json(post, 201);
};

export const updatePost = async (c: Context) => {
  const id = c.req.param("id");
  const { userId } = c.get('user') ?? 0;
  const body = await c.req.json();
  const post = await postModel.updatePost(id, userId, body);
  redisClient.del("posts")
  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  return c.json(post, 200);
};

export const deletePost = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const { userId } = c.get('user') ?? 0;
    await postModel.deletePost(id, userId);
    redisClient.del("posts")
    return c.json({ message: "Post deleted successfully" }, 200);
  } catch (error) {
    return errorHandler(error as Error, c);
  }
};
