import { eq } from "drizzle-orm";
import db from "../db";
import { categories } from "../db/schema";
import type { Category, NewCategory } from "../types/category-type";

export const getAllCategories = async (): Promise<Category[]> => {
  return await db.select().from(categories);
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
  categoryData: NewCategory
): Promise<Category> => {
  const result = await db.insert(categories).values(categoryData).returning();

  return result[0];
};

export const updateCategory = async (
  id: number,
  categoryData: Partial<NewCategory>
): Promise<Category | undefined> => {
  const result = await db
    .update(categories)
    .set(categoryData)
    .where(eq(categories.id, id))
    .returning();

  return result[0];
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  const result = await db
    .delete(categories)
    .where(eq(categories.id, id))
    .returning();

  return result.length === 1;
};

// export const getCategoryWithPosts = async (id: number): Promise<Category | undefined> => {
//   const result = await db.query.categories.findFirst({
//     where: eq(categories.id, id),
//     with: {
//       posts: true
//     }
//   });

//   return result;
// };
