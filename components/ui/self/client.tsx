import type { FC } from 'react';

import type { ClientType } from '@/types';

import { Separator } from '../separator';

import ApiList from './api-list';
import DataTable from './data-table';
import Header from './header';
import Heading from './heading';

type ClientProps = ClientType;

const Client: FC<ClientProps> = ({ data, columns, headerTile, searchKey }) => {
  return (
    <>
      <Header dataArrayLength={data.length} title={headerTile} />

      <DataTable columns={columns} data={data} searchKey={searchKey} />

      <div className='p-4 pl-0'>
        <Heading
          title='API'
          description={`API calls for ${headerTile.toLowerCase()}`}
        />

        <Separator className='my-4' />

        <ApiList
          entityName={headerTile.toLowerCase()}
          entityIdName={`${headerTile
            .toLowerCase()
            .slice(0, headerTile.length - 1)}Id`}
        />
      </div>
    </>
  );
};

export default Client;
