import type { FC } from 'react';

import { redirect } from 'next/navigation';

import { UserButton, auth } from '@clerk/nextjs';

import prismaClient from '@/lib/db';

import ThemeToggle from '@/components/blocks/theme-toggle';

import MainNav from './main-nav';
import StoreSwitcher from './store-switcher';

const Navbar: FC = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismaClient.store.findMany({
    where: { userId }
  });

  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <StoreSwitcher items={stores} />

        <MainNav className='mx-6' />

        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle />
          <UserButton afterSignOutUrl='/' userProfileMode='navigation' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
