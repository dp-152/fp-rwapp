import { z } from "zod";
import { profileSchema } from "./profile";

export const commentSchema = z.object({
  id: z.string(),
  body: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  author: profileSchema,
});

export type Comment = z.infer<typeof commentSchema>;
