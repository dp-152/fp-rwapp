import { z } from "zod";

export const emailSchema = z.string().email({ message: "Invalid email" });

export type Email = z.infer<typeof emailSchema>;
