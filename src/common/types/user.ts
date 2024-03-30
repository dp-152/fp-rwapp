import { z } from "zod";
import { emailSchema } from "./scalar/email";
import { slugSchema } from "./scalar";

export const userSchema = z.object({
  email: emailSchema,
  username: slugSchema,
  password: z.string(),
  bio: z.string().optional(),
  image: z.string().url().optional(),
});

export type User = z.infer<typeof userSchema>;

export const newUserSchema = userSchema.pick({
  email: true,
  username: true,
  password: true,
});

export type NewUser = z.infer<typeof newUserSchema>;

export const newUserResponseSchema = userSchema.pick({
  email: true,
  username: true,
  bio: true,
  image: true,
}).extend({
  token: z.string(),
});

export type NewUserResponse = z.infer<typeof newUserResponseSchema>;

