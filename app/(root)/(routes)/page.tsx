'use client';

import { useEffect } from 'react';

import type { NextPage } from 'next';

import useStoreModal from '@/hooks/use-store-modal';

const SetupPage: NextPage = () => {
  const { onOpen, isOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div className='p-4'>Root page</div>;
};

export default SetupPage;
