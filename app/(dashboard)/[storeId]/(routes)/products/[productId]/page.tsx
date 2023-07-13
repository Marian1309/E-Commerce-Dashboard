import prismaClient from '@/lib/db';

import { ProductForm } from './components';

interface ProductsPageProps {
  params: { productId: string; storeId: string };
}

const ProductPage = async ({ params }: ProductsPageProps) => {
  const product = await prismaClient.product.findUnique({
    where: { id: params.productId },
    include: {
      images: true
    }
  });

  const categories = await prismaClient.category.findMany({
    where: { storeId: params.storeId }
  });

  const sizes = await prismaClient.size.findMany({
    where: { storeId: params.storeId }
  });

  const colors = await prismaClient.color.findMany({
    where: { storeId: params.storeId }
  });

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <ProductForm
        initialData={product}
        categories={categories}
        colors={colors}
        sizes={sizes}
      />
    </div>
  );
};

export default ProductPage;
