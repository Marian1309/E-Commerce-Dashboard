'use client';

import type { FC } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Billboard } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { BillboardFormSchema } from '@/lib/validators';
import { billboardFormSchema } from '@/lib/validators';

import { useBillboardFormStore } from '@/hooks/stores';

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
import { Heading, ImageUpload } from '@/common/ui/self';
import { Separator } from '@/common/ui/separator';

interface SettingsFormProps {
  initialData: Billboard | null;
}

const BillboardForm: FC<SettingsFormProps> = ({ initialData }) => {
  const { isOpen, setIsOpen, isLoading, setIsLoading } =
    useBillboardFormStore();

  const router = useRouter();
  const params = useParams() as { storeId: string; billboardId: string };

  const form = useForm<BillboardFormSchema>({
    defaultValues: initialData || {
      label: '',
      imageUrl: ''
    },
    resolver: zodResolver(billboardFormSchema)
  });

  const title = initialData ? 'Edit billboard' : 'Create billboard';
  const description = initialData ? 'Edit a billboard' : 'Add a new billboard';
  const toastMessage = initialData
    ? 'Billboard updated.'
    : 'Billboard created.';
  const action = initialData ? 'Save changes' : 'Create billboard';

  const onSubmit = async (formData: BillboardFormSchema) => {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          formData
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, formData);
      }

      router.refresh();
      router.push(`/${params.storeId}/billboards`);
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

      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success(`Billboard \`${form.watch('label')}\` deleted.`);
    } catch (error: unknown) {
      toast.error(
        'Make sure you removed all categories using this billboard first.'
      );
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
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>

                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={isLoading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Billboard label'
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

export default BillboardForm;
