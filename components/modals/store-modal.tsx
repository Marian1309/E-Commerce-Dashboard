'use client';

import useStoreModal from '@/hooks/use-store-modal';

import { Modal } from '../ui';

const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();

  return (
    <Modal
      title='Create store'
      description='Add a new store to manage products and categories'
      isOpen={isOpen}
      onClose={onClose}
    >
      Future Create Store Form
    </Modal>
  );
};

export default StoreModal;
