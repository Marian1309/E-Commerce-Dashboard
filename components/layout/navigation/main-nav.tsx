'use client';

import { type FC, type HTMLAttributes, useState } from 'react';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { MoreHorizontal } from 'lucide-react';

import type { Route } from '@/types';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

type MainNavProps = HTMLAttributes<HTMLElement>;

const MainNav: FC<MainNavProps> = ({ className, ...props }) => {
  const pathanme = usePathname();
  const params = useParams() as { storeId: string };

  const [open, setOpen] = useState<boolean>(false);

  const routes: Route[] = [
    {
      id: 1,
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathanme === `/${params.storeId}`
    },
    {
      id: 2,
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathanme === `/${params.storeId}/billboards`
    },
    {
      id: 3,
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathanme === `/${params.storeId}/categories`
    },
    {
      id: 4,
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathanme === `/${params.storeId}/sizes`
    },
    {
      id: 5,
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      active: pathanme === `/${params.storeId}/colors`
    },
    {
      id: 6,
      href: `/${params.storeId}/products`,
      label: 'Products',
      active: pathanme === `/${params.storeId}/products`
    },
    {
      id: 7,
      href: `/${params.storeId}/orders`,
      label: 'Orders',
      active: pathanme === `/${params.storeId}/orders`
    },
    {
      id: 8,
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathanme === `/${params.storeId}/settings`
    }
  ];

  return (
    <>
      <nav
        className={cn(
          'hidden items-center space-x-4 md:flex lg:space-x-6',
          className
        )}
        {...props}
      >
        {routes.map((route) => (
          <Link
            key={route.id}
            href={route.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              route.active
                ? 'text-black dark:text-white'
                : 'text-muted-foreground'
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>

      <nav className='pl-4 md:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className='h-8 w-8 p-0'
              variant='ghost'
              onClick={() => setOpen(true)}
            >
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align='start'
            className={cn('flex flex-col gap-y-2 p-2', open && 'hidden')}
          >
            {routes.map((route) => (
              <Link
                key={route.id}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  route.active
                    ? 'text-black dark:text-white'
                    : 'text-muted-foreground'
                )}
              >
                <DropdownMenuItem>{route.label}</DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
};

export default MainNav;
