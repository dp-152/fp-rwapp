import { z } from "zod";
import { slugSchema } from "./scalar";

export const tagSchema = slugSchema;

export type Tag = z.infer<typeof tagSchema>;
