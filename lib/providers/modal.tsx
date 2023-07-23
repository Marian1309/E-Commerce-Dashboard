'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import StoreModal from '@/common/modals/store-modal';

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <StoreModal />;
};

export default ModalProvider;
