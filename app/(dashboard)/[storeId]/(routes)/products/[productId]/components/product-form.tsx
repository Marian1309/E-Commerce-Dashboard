'use client';

import type { FC } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Category, Color, Image, Product, Size } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { ProductFormSchema, productFormSchema } from '@/lib/validators';

import { useBillboardFormStore } from '@/hooks/stores';

import { AlertModal } from '@/common/modals';
import { Button } from '@/common/ui/button';
import { Checkbox } from '@/common/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/common/ui/select';
import { Heading, ImageUpload } from '@/common/ui/self';
import { Separator } from '@/common/ui/separator';

interface ProductsFormProps {
  initialData: (Product & { images: Image[] }) | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

const ProductForm: FC<ProductsFormProps> = ({
  initialData,
  categories,
  colors,
  sizes
}) => {
  const { isOpen, setIsOpen, isLoading, setIsLoading } =
    useBillboardFormStore();

  const router = useRouter();
  const params = useParams() as { storeId: string; productId: string };

  const form = useForm<ProductFormSchema>({
    defaultValues: initialData
      ? { ...initialData, price: parseFloat(String(initialData.price)) }
      : {
          name: '',
          images: [],
          price: 0,
          categoryId: '',
          colorId: '',
          sizeId: '',
          isFeatured: false,
          isArchived: false
        },
    resolver: zodResolver(productFormSchema)
  });

  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create product';

  const handleProductCreating = async (formData: ProductFormSchema) => {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          formData
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, formData);
      }

      router.refresh();
      router.push(`/${params.storeId}/products`);

      toast.success(toastMessage);
    } catch (err: any) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductDeleting = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);

      router.refresh();
      router.push(`/${params.storeId}/products`);

      toast.success(`Product \`${form.watch('name')}\` deleted.`);
    } catch (error: unknown) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleProductDeleting}
        isLoading={isLoading}
      />

      <div className='flex-between'>
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant='destructive'
            size='icon'
            onClick={() => setIsOpen(true)}
            disabled={isLoading}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleProductCreating)}
          className='w-full space-y-8'
        >
          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>

                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={isLoading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url)
                      ])
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Product name'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Product price'
                      type='number'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>

                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='sizeId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>

                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select a size' />
                    </SelectTrigger>

                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='colorId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>

                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select a color' />
                    </SelectTrigger>

                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isFeatured'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <div className='space-y-1 leading-none'>
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will apear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isArchived'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <div className='space-y-1 leading-none'>
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will apear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isLoading} type='submit'>
            {action}
          </Button>
        </form>
      </Form>

      <Separator />
    </>
  );
};

export default ProductForm;
