import type { Context } from "hono";
import * as tagModel from "../models/tag-model.ts";

export const getAllTags = async (c: Context) => {
  const tags = await tagModel.getAllTags();
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
  const tag = await tagModel.createTag(tagData);
  return c.json(tag, 201);
};

export const updateTag = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  const tagData = await c.req.json();
  const tag = await tagModel.updateTag(id, tagData);

  if (!tag) {
    return c.json({ error: "Tag not found" }, 404);
  }

  return c.json(tag, 200);
};

export const deleteTag = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  const success = await tagModel.deleteTag(id);

  if (!success) {
    return c.json({ error: "Tag not found" }, 404);
  }

  return c.json({ message: "Tag deleted successfully" }, 200);
};
