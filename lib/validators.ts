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

export const sizeFormSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1)
});
export type SizeFormSchema = z.infer<typeof sizeFormSchema>;

export const productFormSchema = z.object({
  name: z.string().min(3),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional()
});
export type ProductFormSchema = z.infer<typeof productFormSchema>;
