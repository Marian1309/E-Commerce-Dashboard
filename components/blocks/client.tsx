import type { FC } from 'react';

import type { ClientType } from '@/types';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import ApiList from './api-list';
import DataTable from './data-table';
import Header from './header';

type ClientProps = ClientType & { isOrder?: boolean };

const Client: FC<ClientProps> = ({
  data,
  columns,
  headerTile,
  searchKey,
  isOrder
}) => {
  if (isOrder) {
    return (
      <>
        <Header dataArrayLength={data.length} title={headerTile} />

        <DataTable columns={columns} data={data} searchKey={searchKey} />
      </>
    );
  }

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
