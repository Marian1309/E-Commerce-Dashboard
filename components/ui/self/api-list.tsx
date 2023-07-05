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

  const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/${params.storeId}`;

  return (
    <>
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
    </>
  );
};

export default ApiList;
