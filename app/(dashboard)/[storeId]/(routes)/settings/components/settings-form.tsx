'use client';

import type { FC } from 'react';
import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Store } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { FormSchema } from '@/lib/validators';
import { formSchema } from '@/lib/validators';

import useOrigin from '@/hooks/use-origin';

import { AlertModal } from '@/common/modals';
import { ApiAlert, Heading } from '@/common/ui';
import { Button } from '@/common/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import { Separator } from '@/common/ui/separator';

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm: FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams() as { storeId: string };
  const origin = useOrigin();

  const form = useForm<FormSchema>({
    defaultValues: initialData,
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (formData: FormSchema) => {
    if (formData.name === initialData.name) {
      return toast.error('Type something different.');
    }

    try {
      setIsLoading(true);

      await axios.patch(`/api/stores/${params.storeId}`, formData);
      router.refresh();
      toast.success('Store updated.');
    } catch (err: any) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/');
      toast.success(`Store ${form.watch('name')} deleted.`);
    } catch (err: any) {
      toast.error('Make sure you removed all products and categories first');
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />

      <div className='flex-between'>
        <Heading title='Settings' description='Manage store preferences' />

        <Button
          variant='destructive'
          size='icon'
          onClick={() => setOpen(true)}
          disabled={isLoading}
        >
          <Trash className='h-4 w-4' />
        </Button>
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
                      placeholder='Store name'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isLoading} type='submit'>
            Save changes
          </Button>
        </form>
      </Form>

      <Separator />

      <ApiAlert
        title='NEXT_PUBLIC_API_URL'
        description={`${origin}/api/${params.storeId}`}
        variant='public'
      />
    </>
  );
};

export default SettingsForm;
