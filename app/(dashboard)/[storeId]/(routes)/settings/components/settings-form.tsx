'use client';

import type { FC } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Store } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { FormSchema } from '@/lib/validators';
import { formSchema } from '@/lib/validators';

import { useSettingsStore } from '@/hooks/stores';

import ApiAlert from '@/components/blocks/api-alert';
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
  initialData: Store;
}

const SettingsForm: FC<SettingsFormProps> = ({ initialData }) => {
  const { isOpen, isLoading, setIsOpen, setIsLoading } = useSettingsStore();

  const router = useRouter();
  const params = useParams() as { storeId: string };

  const form = useForm<FormSchema>({
    defaultValues: initialData,
    resolver: zodResolver(formSchema)
  });

  const handleStoreNameChanging = async (formData: FormSchema) => {
    if (formData.name === initialData.name) {
      return toast.error('Type something different.');
    }

    try {
      setIsLoading(true);

      await axios.patch(`/api/stores/${params.storeId}`, formData);

      router.refresh();

      toast.success(`Store \`${form.watch('name')}\` updated.`);
    } catch (error: any) {
      toast.error(error.response.data);
      console.clear();
    } finally {
      setIsLoading(false);
    }
  };

  const handleStoreDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/stores/${params.storeId}`);

      router.refresh();
      router.push('/');

      toast.success(`Store \`${form.watch('name')}\` deleted.`);
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
        onConfirm={handleStoreDelete}
        isLoading={isLoading}
      />

      <div className='flex-between'>
        <Heading title='Settings' description='Manage store preferences' />

        <Button
          variant='destructive'
          size='icon'
          onClick={() => setIsOpen(true)}
          disabled={isLoading}
        >
          <Trash className='h-4 w-4' />
        </Button>
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleStoreNameChanging)}
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

                  <FormMessage />
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
        description={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/${params.storeId}`}
        variant='public'
      />
    </>
  );
};

export default SettingsForm;
