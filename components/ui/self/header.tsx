'use client';

import type { FC } from 'react';

import { useParams, useRouter } from 'next/navigation';

import AddNewButton from './add-new-button';
import Heading from './heading';

interface HeaderProps {
  dataArrayLength: number;
  title:
    | 'Billboards'
    | 'Categories'
    | 'Sizes'
    | 'Colors'
    | 'Products'
    | 'Orders';
}

const Header: FC<HeaderProps> = ({ dataArrayLength, title }) => {
  const params = useParams() as { storeId: string };
  const router = useRouter();

  const lowerCasedTitle = title.toLowerCase();

  return (
    <div className='p-4 flex-between'>
      <Heading
        title={`${title} (${dataArrayLength})`}
        description={`Manage ${lowerCasedTitle} for your store`}
      />

      <AddNewButton
        onClick={() => router.push(`/${params.storeId}/${lowerCasedTitle}/new`)}
      />
    </div>
  );
};

export default Header;
