'use client';

import type { FC } from 'react';
import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import type { Store } from '@prisma/client';
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon
} from 'lucide-react';

import { cn } from '@/lib/utils';

import { useStoreModalStore } from '@/hooks/stores';

import { Button } from '@/common/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/common/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/common/ui/popover';

interface StoreSwitcherProps {
  items: Store[];
  className?: string;
}

const StoreSwitcher: FC<StoreSwitcherProps> = ({ className, items = [] }) => {
  const params = useParams() as { storeId: string };
  const { push } = useRouter();

  const storeModal = useStoreModalStore();
  const [open, setOpen] = useState<boolean>(false);

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const handleStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    push(`/${store.value}`);
  };

  const handleStoreCreateSelect = () => {
    setOpen(false);
    storeModal.onOpen();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a store'
          className={cn('w-[200px] justify-between', className)}
        >
          <StoreIcon className='mr-2 h-4 w-4' />
          {currentStore?.label}
          <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search store...' />

            <CommandEmpty>No store found.</CommandEmpty>

            <CommandGroup heading='Stores'>
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => handleStoreSelect(store)}
                  className='text-sm'
                >
                  <StoreIcon className='mr-2' />
                  {store.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentStore?.value === store.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />

          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={handleStoreCreateSelect}>
                <PlusCircle className='mr-2 h-5 w-5' />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
