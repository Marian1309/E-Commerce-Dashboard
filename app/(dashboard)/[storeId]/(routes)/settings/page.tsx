import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs';

import { prismadb } from '@/lib/db';

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
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8'>
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default Settings;
