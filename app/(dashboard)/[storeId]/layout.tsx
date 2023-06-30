import type { ReactNode } from 'react';

import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs';

import { prismadb } from '@/lib/db';

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

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      {/* @ts-expect-error server component */}
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
