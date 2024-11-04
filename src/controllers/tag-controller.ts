import type { Context } from "hono";
import * as tagModel from "../models/tag-model.ts";
import { errorHandler } from "../middleware/error-middleware.ts";
import redisClient from "../config/redis.ts";

export const getAllTags = async (c: Context) => {
  const cached = await redisClient.get("tags")
  const parseCached = cached ? JSON.parse(cached) : []
  if (parseCached.length > 0) return c.json(parseCached, 200)
  const tags = await tagModel.getAllTags(c.req.query());
  redisClient.set("tags", JSON.stringify(tags), { EX: 60 });
  return c.json(tags, 200);
};

export const getTagById = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  const tag = await tagModel.getTagById(id);

  if (!tag) {
    return c.json({ error: "Tag not found" }, 404);
  }

  return c.json(tag, 200);
};

export const createTag = async (c: Context) => {
  const tagData = await c.req.json();
  const {userId} = c.get("user");
  const tag = await tagModel.createTag(tagData,userId);
  redisClient.del("tags")
  return c.json(tag, 201);
};

export const updateTag = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  const { userId } = c.get('user') ?? 0;
  const tagData = await c.req.json();
  const tag = await tagModel.updateTag(id, userId, tagData);
  
  if (!tag) {
    return c.json({ error: "Tag not found" }, 404);
  }
  redisClient.del("tags")
  return c.json(tag, 200);
};

export const deleteTag = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"), 10);
    const { userId } = c.get('user') ?? 0;
    await tagModel.deleteTag(id, userId);
    redisClient.del("tags")
    return c.json({ message: "Tag deleted successfully" }, 200);
  } catch (error) {
    return errorHandler(error as Error, c);
  }
};
