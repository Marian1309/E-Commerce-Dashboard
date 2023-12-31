'use client';

import type { FC } from 'react';

import { useParams } from 'next/navigation';

import ApiAlert from './api-alert';

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList: FC<ApiListProps> = ({ entityIdName, entityName }) => {
  const params = useParams() as { storeId: string };

  const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/${params.storeId}`;

  return (
    <div className='flex flex-col gap-y-4'>
      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}`}
      />

      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />

      <ApiAlert
        title='POST'
        variant='admin'
        description={`${baseUrl}/${entityName}`}
      />

      <ApiAlert
        title='POST'
        variant='admin'
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />

      <ApiAlert
        title='PATCH'
        variant='admin'
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />

      <ApiAlert
        title='DELETE'
        variant='admin'
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />
    </div>
  );
};

export default ApiList;
