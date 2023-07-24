'use client';

import type { FC } from 'react';

import Loader from '@/components/ui/loader';

const Loading: FC = () => {
  return (
    <div className='h-screen flex-center'>
      <Loader />
    </div>
  );
};

export default Loading;
