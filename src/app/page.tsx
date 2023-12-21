import { HomeGallery } from "@/components/HomeGallery";
import { getProductsAction } from "@/contexts/product/application/actions/getProducts";

export default async function Home() {
  const products = await getProductsAction();

  if (
    !Array.isArray(products) ||
    products.length < 1
  ) {
    return <>Add products on the admin app 🙊</>;
  }
  
  return (
    <main className="flex flex-col items-center justify-between md:px-10 lg:px-16 px-10">
      <HomeGallery products={products} />
    </main>
  );
}
