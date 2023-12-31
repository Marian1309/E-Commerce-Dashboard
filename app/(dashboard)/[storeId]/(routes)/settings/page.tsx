import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs';

import { ADMIN_USER_ID } from '@/lib/constants';
import prismaClient from '@/lib/db';

import { SettingsForm } from './components';

interface SettingsProps {
  params: {
    storeId: string;
  };
}

const Settings = async ({ params }: SettingsProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismaClient.store.findFirst({
    where: {
      userId: ADMIN_USER_ID,
      id: params.storeId
    }
  });

  if (!store) {
    redirect('/');
  }

  return (
    <div className='flex-1 space-y-4 p-4'>
      <SettingsForm initialData={store} />
    </div>
  );
};

export default Settings;
