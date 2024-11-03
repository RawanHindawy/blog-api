import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  content: z.string().min(1, "Content is required").max(10000, "Content must be less than 10000 characters"),
  createdAt: z.date().optional(),
  categoryId: z.number().int().positive("Category ID is required"),
  userId: z.number().int().positive("User ID is required"),
});

export type PostInput = z.infer<typeof postSchema>;
