'use client';

import type { FC, HTMLAttributes } from 'react';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import type { Route } from '@/types';

import { cn } from '@/lib/utils';

type MainNavProps = HTMLAttributes<HTMLElement>;

const MainNav: FC<MainNavProps> = ({ className, ...props }) => {
  const pathanme = usePathname();
  const params = useParams() as { storeId: string };

  const routes: Route[] = [
    {
      id: 1,
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathanme === `/${params.storeId}`
    },
    {
      id: 2,
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathanme === `/${params.storeId}/settings`
    }
  ];

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
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
  );
};

export default MainNav;
