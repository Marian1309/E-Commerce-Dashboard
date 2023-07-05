'use client';

import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Store } from '@prisma/client';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { FormSchema } from '@/lib/validators';
import { formSchema } from '@/lib/validators';

import { useStoreModalStore } from '@/hooks/stores';

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
import { Modal } from '@/common/ui/self';

const StoreModal: FC = () => {
  const { isOpen, onClose, isLoading, setIsLoading } = useStoreModalStore();

  const form = useForm<FormSchema>({
    defaultValues: { name: '' },
    resolver: zodResolver(formSchema)
  });

  const handleCreatingStore = async (formData: FormSchema) => {
    try {
      setIsLoading(true);

      const { data } = await axios.post<Store>('/api/stores', formData);

      window.location.assign(`/${data.id}`);
    } catch (err: unknown) {
      toast.error('Somrthing went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title='Create store'
      description='Add a new store to manage products and categories'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='space-y-4 py-2 pb-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreatingStore)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='E-Commerce'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-x-2 pt-6 flex-end'>
              <Button variant='outline' onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>

              <Button disabled={isLoading} type='submit'>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default StoreModal;
