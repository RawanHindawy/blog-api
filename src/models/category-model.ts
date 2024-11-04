import { eq } from "drizzle-orm";
import db from "../db";
import { categories } from "../db/schema";
import type { Category, NewCategory } from "../types/category-type";
import { HTTPException } from "hono/http-exception";

export const getAllCategories = async (): Promise<Category[]> => {
  const categoriesResult = await db.query.categories.findMany({
    with: {
      user: true
    }
  });

  return categoriesResult;
};

export const getCategoryById = async (
  id: number
): Promise<Category | undefined> => {
  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);

  return result[0];
};

export const createCategory = async (
  categoryData: NewCategory,
  userId: number  
): Promise<Category> => {
  const result = await db.insert(categories).values({...categoryData,userId}).returning();

  return result[0];
};

export const updateCategory = async (
  id: number,
  userId: number,
  categoryData: Partial<NewCategory>
): Promise<Category | undefined> => {
  const category = await getCategoryById(id);
  if (category){
    if (category && category.userId !== userId) {
      throw new HTTPException(403, { message: "You are not authorized to update this category" });
    } 
    const result = await db
      .update(categories)
      .set(categoryData)
      .where(eq(categories.id, id))
      .returning();

    return result[0];
}else{
  throw new HTTPException(404, { message: "Category not found" });
}
};

export const deleteCategory = async (id: number, userId: number): Promise<boolean> => {
  const category = await getCategoryById(id);
  if (category){
    if (category.userId !== userId) {
      throw new HTTPException(403, { message: "You are not authorized to delete this category" });
    } 
    await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();

    return true;
  } else {
    throw new HTTPException(404, { message: "Category not found" });
  }
};
