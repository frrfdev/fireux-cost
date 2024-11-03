import { LayoutPrivate } from '../layout-private';
import { ProductForm } from './components/product.form';

export { Page };

function Page() {
  return (
    <LayoutPrivate>
      <ProductForm></ProductForm>
    </LayoutPrivate>
  );
}
