import { z } from "zod";
import { userSchema } from "./user";

export const profileSchema = userSchema
  .pick({
    username: true,
    bio: true,
    image: true,
  })
  .extend({
    following: z.boolean(),
  });

export type Profile = z.infer<typeof profileSchema>;
