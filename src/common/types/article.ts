import { z } from "zod";
import { profileSchema } from "./profile";
import { tagSchema } from "./tag";
import { slugSchema } from "./scalar";

export const articleSchema = z.object({
  slug: slugSchema,
  title: z.string(),
  description: z.string(),
  body: z.string(),
  tagList: z.array(tagSchema),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  favorited: z.boolean(),
  favoritesCount: z.number(),
  author: profileSchema,
});

export type Article = z.infer<typeof articleSchema>;
