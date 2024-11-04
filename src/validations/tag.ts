import { z } from "zod";

export const tagSchema = z.object({
  name: z.string().min(1, "Tag name is required").max(50, "Tag name must be less than 50 characters"),
  description: z.string().max(200, "Description must be less than 200 characters").optional()
});

export type TagInput = z.infer<typeof tagSchema>;
