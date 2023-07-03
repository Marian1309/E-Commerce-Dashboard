import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(3)
});
export type FormSchema = z.infer<typeof formSchema>;

export const billboardFormSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.any().refine((files) => files?.length > 0, 'Image is required.')
});
export type BillboardFormSchema = z.infer<typeof billboardFormSchema>;

export const categoryFormSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1)
});
export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;
