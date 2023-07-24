import type { NextPage } from 'next';

import { DollarSign } from 'lucide-react';

import { formatPrice } from '@/lib/utils';

import {
  getGraphRevenue,
  getSalesCount,
  getStockCount,
  getTotalRevenue
} from '@/actions';

import Overview from '@/components/blocks/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: NextPage<DashboardPageProps> = async ({
  params: { storeId }
}) => {
  const totalRevenue = await getTotalRevenue(storeId);
  const salesCount = await getSalesCount(storeId);
  const stockCount = await getStockCount(storeId);
  const graphRevenue = await getGraphRevenue(storeId);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview of your store' />

        <Separator />

        <div className='grid grid-cols-3 gap-4'>
          <Card>
            <CardHeader className='flex-row space-y-0 pb-2 flex-between'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>

              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>
                {formatPrice(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex-row space-y-0 pb-2 flex-between'>
              <CardTitle className='text-sm font-medium'>Sales</CardTitle>

              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>+{salesCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex-row space-y-0 pb-2 flex-between'>
              <CardTitle className='text-sm font-medium'>
                Products in Stock
              </CardTitle>

              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>{stockCount}</div>
            </CardContent>
          </Card>
        </div>

        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>

          <CardContent className='pl-2'>
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
