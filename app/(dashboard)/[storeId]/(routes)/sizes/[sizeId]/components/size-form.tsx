'use client';

import type { FC } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Size } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { SizeFormSchema } from '@/lib/validators';
import { sizeFormSchema } from '@/lib/validators';

import { useBillboardIdStore } from '@/hooks';

import { AlertModal } from '@/common/modals';
import { Heading } from '@/common/ui';
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
import { Separator } from '@/common/ui/separator';

interface SizesFormProps {
  initialData: Size | null;
}

const SizeForm: FC<SizesFormProps> = ({ initialData }) => {
  const { isOpen, setIsOpen, isLoading, setIsLoading } = useBillboardIdStore();

  const router = useRouter();
  const params = useParams() as { storeId: string; billboardId: string };

  const form = useForm<SizeFormSchema>({
    defaultValues: initialData || {
      name: '',
      value: ''
    },
    resolver: zodResolver(sizeFormSchema)
  });

  const title = initialData ? 'Edit size' : 'Create size';
  const description = initialData ? 'Edit a size' : 'Add a new size';
  const toastMessage = initialData ? 'Size updated.' : 'Size created.';
  const action = initialData ? 'Save changes' : 'Create size';

  const onSubmit = async (formData: SizeFormSchema) => {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.billboardId}`,
          formData
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, formData);
      }

      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success(toastMessage);
    } catch (err: any) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/${params.storeId}/sizes/${params.billboardId}`);
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success(`Size ${form.watch('name')} deleted.`);
    } catch (error: any) {
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
        onConfirm={handleDelete}
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
          onSubmit={form.handleSubmit(onSubmit)}
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
                      placeholder='Size name'
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
                      placeholder='Size value'
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

export default SizeForm;
