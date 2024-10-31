import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ProductRowDraggable } from './product-row-draggable';
import { ProductPopulated } from '@/features/product/types/product';

type Props = {
  products: ProductPopulated[];
};

export const ProductList = ({ products }: Props) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col items-center gap-4 h-full overflow-hidden p-4 shadow-lg">
      <Input placeholder="Busque o produto" onChange={handleSearchChange}></Input>
      <ul className="w-full overflow-y-auto gap-2 flex flex-col">
        {filteredProducts.map((product, index) => (
          <ProductRowDraggable key={product.documentId} product={product} index={index} />
        ))}
      </ul>
    </div>
  );
};
