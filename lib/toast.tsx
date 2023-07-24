import type { FC } from 'react';

import type { ToastOptions } from 'react-hot-toast';

interface ToastProps {
  title: string;
  description: string;
}

const ToastIn2Rows: FC<ToastProps> = ({ title, description }) => {
  return (
    <div className='flex flex-col'>
      <h2>{title}</h2>
      <p className='text-xs'>{description}</p>
    </div>
  );
};

const toastOptions: ToastOptions = {
  style: { background: '#333', color: '#fff' },
  duration: 2500
};

export { toastOptions, ToastIn2Rows };
