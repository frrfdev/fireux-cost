import { Input } from '@/components/ui/input';
import { ProductRowDraggable } from './product-row-draggable';
import { ProductPopulated } from '@/features/product/types/product';
import {
  InfiniteScroll,
  InfiniteScrollProps,
} from '@/components/ui/infinite-scroll';
import { useProductStore } from '../stores/use-product-store';
import { PackageOpen } from 'lucide-react';

type Props = {
  products: ProductPopulated[];
} & Omit<InfiniteScrollProps, 'children'>;

export const ProductList = ({ products, ...props }: Props) => {
  const setSearch = useProductStore((state) => state.setSearch);
  const search = useProductStore((state) => state.search);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center gap-4 h-full overflow-hidden p-4 shadow-lg product-list">
      <Input
        placeholder="Busque o produto"
        onChange={handleSearchChange}
      ></Input>
      {!products.length && (
        <div className="flex flex-col items-center gap-2 my-6 text-gray-300 h-full justify-center">
          <PackageOpen size={60}></PackageOpen>
          <h3 className="text-center text-xl font-semibold uppercase">
            Nenhum produto encontrado
          </h3>
          <p className="text-center text-sm">
            Cadastre um produto ao lado para começar
          </p>
        </div>
      )}
      <InfiniteScroll
        {...props}
        className="w-full overflow-y-auto gap-2 flex flex-col"
      >
        {filteredProducts.map((product, index) => (
          <ProductRowDraggable
            key={product.documentId}
            product={product}
            index={index}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};
