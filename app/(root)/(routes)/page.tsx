'use client';

import { useEffect } from 'react';

import type { NextPage } from 'next';

import { useStoreModalStore } from '@/hooks/stores';

const SetupPage: NextPage = () => {
  const { onOpen, isOpen } = useStoreModalStore();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
