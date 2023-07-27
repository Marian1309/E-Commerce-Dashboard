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

import ImageUpload from '@/components/blocks/image-upload';
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
import { Separator } from '@/components/ui/separator';

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

  const handleBillboardCreating = async (formData: BillboardFormSchema) => {
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
    } catch (error: any) {
      toast.error(error.response.data);
      console.clear();
    } finally {
      setIsLoading(false);
    }
  };

  const handleBillboardDeleting = async () => {
    try {
      setIsLoading(true);

      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );

      router.refresh();
      router.push(`/${params.storeId}/billboards`);

      toast.success(`Billboard \`${form.watch('label')}\` deleted.`);
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
        onConfirm={handleBillboardDeleting}
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
          onSubmit={form.handleSubmit(handleBillboardCreating)}
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
