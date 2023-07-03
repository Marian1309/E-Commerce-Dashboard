'use client';

import { useEffect } from 'react';

import type { NextPage } from 'next';

import { useModalStore } from '@/hooks/stores';

const SetupPage: NextPage = () => {
  const { onOpen, isOpen } = useModalStore();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
