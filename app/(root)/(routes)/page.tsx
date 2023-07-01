'use client';

import { useEffect } from 'react';

import type { NextPage } from 'next';

import { useModalStore } from '@/hooks';

const SetupPage: NextPage = () => {
  const { onOpen, isOpen } = useModalStore();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div className='p-4'>Root page</div>;
};

export default SetupPage;
