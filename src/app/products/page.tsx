import Buttons from "@/components/Buttons";
import Form from "@/components/Form";
import ProductCard from "@/components/ProductCard";
import Select from "@/components/Select";
import { getProductsAction } from "@/contexts/product/application/actions/getProducts";
import { getProductsByCategoryAction } from "@/contexts/product/application/actions/getProductsByCategory";

interface ProductPageParams {
  searchParams: {
    category: string;
  };
}

export default async function ProductsPage(
  props: ProductPageParams
) {
  const {
    searchParams: { category },
  } = props;
  const allProducts = await getProductsAction();

  if (!Array.isArray(allProducts)) {
    return (
      <>We don&apos;t have any product in store</>
    );
  }

  const categories = Array.from(
    new Set(
      allProducts.map(
        (product) => product.attributes.category
      )
    )
  );

  let products = null;
  if (category) {
    products = await getProductsByCategoryAction(
      undefined,
      category
    );
  }

  return (
    <section>
      <Form className="block w-6/12">
        <label htmlFor="category">
          Search for category:{" "}
        </label>
        <Select
          title="category"
          name="category"
          id="category"
          className="p-2 mb-6 text-sm border border-store-bg-100"
          options={categories}
          defaultValue={category}
        />
        <Buttons.Button type="submit">
          Search
        </Buttons.Button>
      </Form>

      {!category && (
        <>
          <p>Showing all products</p>
          <div className="min-h-[500px] grid grid-cols-2 md:grid-cols-3">
            {Array.isArray(allProducts) &&
              allProducts.map(
                (product, index) => (
                  <ProductCard
                    key={`product-${index}`}
                    product={product}
                    href={`products/${product.id}`}
                  />
                )
              )}
          </div>
        </>
      )}
      {category && (
        <div className="min-h-[500px] grid grid-cols-2 md:grid-cols-3">
          {!Array.isArray(products) ||
            (!products.length && (
              <>
                There are 0 products for category{" "}
                {category}
              </>
            ))}
          {Array.isArray(products) &&
            products.map((product, index) => (
              <ProductCard
                key={`product-${index}`}
                product={product}
                href={`products/${product.id}`}
              />
            ))}
        </div>
      )}
    </section>
  );
}
