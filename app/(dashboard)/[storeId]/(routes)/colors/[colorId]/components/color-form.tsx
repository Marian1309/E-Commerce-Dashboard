'use client';

import type { FC } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Color } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { SizeFormSchema } from '@/lib/validators';
import { sizeFormSchema } from '@/lib/validators';

import { useSizeFormStore } from '@/hooks/stores';

import { AlertModal } from '@/common/modals';
import { Button } from '@/common/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import { Heading } from '@/common/ui/self';
import { Separator } from '@/common/ui/separator';

interface ColorFormProps {
  initialData: Color | null;
}

const ColorForm: FC<ColorFormProps> = ({ initialData }) => {
  const { isOpen, setIsOpen, isLoading, setIsLoading } = useSizeFormStore();

  const router = useRouter();
  const params = useParams() as { storeId: string; billboardId: string };

  const form = useForm<SizeFormSchema>({
    defaultValues: initialData || {
      name: '',
      value: ''
    },
    resolver: zodResolver(sizeFormSchema)
  });

  const title = initialData ? 'Edit color' : 'Create color';
  const description = initialData ? 'Edit a color' : 'Add a new color';
  const toastMessage = initialData ? 'Color updated.' : 'Color created.';
  const action = initialData ? 'Save changes' : 'Create color';

  const handleColorCreatingOrUpdating = async (formData: SizeFormSchema) => {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.billboardId}`,
          formData
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, formData);
      }

      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (err: unknown) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleColorDeleting = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/${params.storeId}/colors/${params.billboardId}`);

      router.refresh();
      router.push(`/${params.storeId}/colors`);

      toast.success(`Color \`${form.watch('name')}\` deleted.`);
    } catch (error: unknown) {
      toast.error('Make sure you removed all products using this size first.');
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
        onConfirm={handleColorDeleting}
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
          onSubmit={form.handleSubmit(handleColorCreatingOrUpdating)}
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
                      placeholder='Color name'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Color value'
                      {...field}
                    />
                  </FormControl>

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

export default ColorForm;
