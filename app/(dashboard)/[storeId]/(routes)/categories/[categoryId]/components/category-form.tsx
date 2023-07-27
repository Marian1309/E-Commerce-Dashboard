'use client';

import type { FC } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Billboard, Category } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { CategoryFormSchema } from '@/lib/validators';
import { categoryFormSchema } from '@/lib/validators';

import { useCategoryFormStore } from '@/hooks/stores';

import AlertModal from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface SettingsFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

const CategoryForm: FC<SettingsFormProps> = ({ initialData, billboards }) => {
  const { isOpen, setIsOpen, isLoading, setIsLoading } = useCategoryFormStore();

  const router = useRouter();
  const params = useParams() as {
    storeId: string;
    billboardId: string;
    categoryId: string;
  };

  const form = useForm<CategoryFormSchema>({
    defaultValues: initialData || {
      name: '',
      billboardId: ''
    },
    resolver: zodResolver(categoryFormSchema)
  });

  const title = initialData ? 'Edit category' : 'Create category';
  const description = initialData ? 'Edit a category' : 'Add a new category';
  const toastMessage = initialData ? 'Category updated.' : 'Category created.';
  const action = initialData ? 'Save changes' : 'Create category';

  const handleCategoryCreating = async (formData: CategoryFormSchema) => {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          formData
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, formData);
      }

      router.refresh();
      router.push(`/${params.storeId}/categories`);

      toast.success(toastMessage);
    } catch (error: any) {
      toast.error(error.response.data);
      console.clear();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryDeleting = async () => {
    try {
      setIsLoading(true);

      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );

      router.refresh();
      router.push(`/${params.storeId}/categories`);

      toast.success(`Category \`${form.watch('name')}\` deleted.`);
    } catch (error: any) {
      toast.error(error.response.data);
      console.clear();
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
        onConfirm={handleCategoryDeleting}
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
          onSubmit={form.handleSubmit(handleCategoryCreating)}
          className='w-full space-y-8'
        >
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
                      placeholder='Category label'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='billboardId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>

                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select a billboard' />
                    </SelectTrigger>

                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
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

export default CategoryForm;
