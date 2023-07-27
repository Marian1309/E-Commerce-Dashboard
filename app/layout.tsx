import type { FC, ReactNode } from 'react';

import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

import { ModalProvider, ThemeProvider } from '@/lib/providers';
import { toastOptions } from '@/lib/toast';

import './globals.scss';

const figtree = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard for Stores',
  authors: [{ name: 'Marian Pidchashyi', url: 'https://github.com/Marian1309' }]
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={figtree.className}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <Toaster toastOptions={toastOptions} />

            <ModalProvider />

            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
