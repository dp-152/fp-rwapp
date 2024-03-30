import { z } from "zod";

export const slugSchema = z.string().regex(/^[a-zA-Z0-9_-]+$/);
