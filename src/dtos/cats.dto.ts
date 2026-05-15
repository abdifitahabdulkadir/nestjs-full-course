import { z } from 'zod';

export const createCatSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(1),
  breed: z.string().min(1),
});
export const updateCatSchema = createCatSchema.partial();

// types
export type CreateCatDTO = z.infer<typeof createCatSchema>;
export type UpdateCatDTO = z.infer<typeof updateCatSchema>;
