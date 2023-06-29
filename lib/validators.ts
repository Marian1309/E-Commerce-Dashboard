import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1)
});

export type FormSchema = z.infer<typeof formSchema>;
