import type { FC, ReactNode } from 'react';

import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

import { ICONS } from '@/lib/constants';
import { ModalProvider } from '@/lib/providers';
import { toastOptions } from '@/lib/toast';

import './globals.scss';

const figtree = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard for Stores',
  icons: { icon: ICONS.favicon },
  authors: [{ name: 'Marian Pidchashyi', url: 'https://github.com/Marian1309' }]
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={figtree.className}>
          <Toaster toastOptions={toastOptions} />

          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
