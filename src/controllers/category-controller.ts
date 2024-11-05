import type { Context } from "hono";
import * as categoryModel from "../models/category-model";
import { errorHandler } from "../middleware/error-middleware";
import redisClient from "../config/redis";

export const getAllCategories = async (c: Context) => {
  const cached = await redisClient.get("categories");
  const parseCached = cached ? JSON.parse(cached) : [];
  if (parseCached.length > 0) return c.json(parseCached, 200);
  const categories = await categoryModel.getAllCategories(c.req.query());
  redisClient.set("categories", JSON.stringify(categories), { EX: 60 });
  return c.json(categories, 200);
};

export const getCategoryById = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  const category = await categoryModel.getCategoryById(id);

  if (!category) {
    return c.json({ error: "Category not found" }, 404);
  }

  return c.json(category, 200);
};

export const createCategory = async (c: Context) => {
  const categoryData = await c.req.json();
  const { userId } = c.get("user");
  const category = await categoryModel.createCategory(categoryData, userId);
  redisClient.del("categories");
  return c.json(category, 201);
};

export const updateCategory = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  const { userId } = c.get("user") ?? 0;
  const categoryData = await c.req.json();
  const category = await categoryModel.updateCategory(id, userId, categoryData);

  if (!category) {
    return c.json({ error: "Category not found" }, 404);
  }
  redisClient.del("categories");
  return c.json(category, 200);
};

export const deleteCategory = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"), 10);
    const { userId } = c.get("user") ?? 0;
    await categoryModel.deleteCategory(id, userId);
    redisClient.del("categories");
    return c.json({ message: "Category deleted successfully" }, 200);
  } catch (error) {
    return errorHandler(error as Error, c);
  }
};
