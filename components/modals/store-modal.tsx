'use client';

import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { FormSchema } from '@/lib/validators';
import { formSchema } from '@/lib/validators';

import useStoreModal from '@/hooks/use-store-modal';

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

import { Modal } from '../ui';

const StoreModal: FC = () => {
  const { isOpen, onClose } = useStoreModal();
  const form = useForm<FormSchema>({
    defaultValues: {
      name: ''
    },
    resolver: zodResolver(formSchema)
  });

  const handleSubmit = async (formData: FormSchema) => {
    console.log(formData);
    // TODO: Create store
  };

  return (
    <Modal
      title='Create store'
      description='Add a new store to manage products and categories'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className=''>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='E-Commerce' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex items-center justify-end space-x-2 pt-6'>
                <Button variant='outline' onClick={onClose}>
                  Cancel
                </Button>
                <Button type='submit'>Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
