import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().min(1, "Comment content is required").max(1000, "Comment must be less than 1000 characters"),
  createdAt: z.date().optional(),
  postId: z.number().int().positive("Post ID is required"),
  userId: z.number().int().positive("User ID is required"),
});

export type CommentInput = z.infer<typeof commentSchema>;

