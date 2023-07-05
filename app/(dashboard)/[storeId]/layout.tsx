import type { ReactNode } from 'react';

import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs';

import prismaClient from '@/lib/db';

import { Navbar } from '@/common/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
  params: {
    storeId: string;
  };
}

const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismaClient.store.findFirst({
    where: {
      userId,
      id: params.storeId
    }
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
