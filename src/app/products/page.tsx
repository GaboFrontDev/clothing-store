import ProductCard from "@/components/ProductCard";
import { getProductsAction } from "@/contexts/product/application/actions/getProducts";
import { getProductsByCategoryAction } from "@/contexts/product/application/actions/getProductsByCategory";

interface ProductPageParams {
  searchParams: {
    category: string;
  };
}


export default async function ProductsPage(props: ProductPageParams) {
  const {
    searchParams: { category },
  } = props;
  let products = null;
  if (category) {
    products = await getProductsByCategoryAction(undefined, category);
  }
  products = await getProductsAction();
  
  if (!Array.isArray(products)) {
    return <>No hay productos en inventario</>;
  }
  const categories = products.map((product) => product.attributes.category);

  return (
    <section>
      <form className="block w-6/12">
        <select
          title="category"
          name="category"
          id="category"
          className="p-2 mb-6 text-sm border border-store-bg-100"
        >
          {categories.map((category, index) => (
            <option key={`category-${index}`} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit">Buscar</button>
      </form>
      <div className="min-h-[500px] grid grid-cols-2 md:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard
            key={`product-${index}`}
            product={product}
            href={`products/${product.id}`}
          />
        ))}
      </div>
    </section>
  );
}
