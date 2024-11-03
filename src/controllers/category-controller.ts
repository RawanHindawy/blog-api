import type { Context } from "hono";
import * as categoryModel from "../models/category-model";

export const getAllCategories = async (c: Context) => {
  const categories = await categoryModel.getAllCategories();
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
  const category = await categoryModel.createCategory(categoryData);
  return c.json(category, 201);
};

export const updateCategory = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  const categoryData = await c.req.json();
  const category = await categoryModel.updateCategory(id, categoryData);

  if (!category) {
    return c.json({ error: "Category not found" }, 404);
  }

  return c.json(category, 200);
};

export const deleteCategory = async (c: Context) => {
  const id = parseInt(c.req.param("id"), 10);
  const success = await categoryModel.deleteCategory(id);

  if (!success) {
    return c.json({ error: "Category not found" }, 404);
  }

  return c.json({ message: "Category deleted successfully" }, 200);
};
