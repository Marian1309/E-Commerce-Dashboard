import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1)
});
export type FormSchema = z.infer<typeof formSchema>;

export const billboardFormSchema = z.object({
  label: z.string().min(1),
  imageUrl: z
    .any()
    .refine((files) => files?.[0].length === 0, 'Image is required.')
});
export type BillboardFormSchema = z.infer<typeof billboardFormSchema>;
