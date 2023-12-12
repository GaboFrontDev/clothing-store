import ProductCard from "@/components/ProductCard";
import { getProductById } from "@/contexts/cart/application/helpers/productsInventoryQueries";

interface PageProps {
    params: {
        product_id: string
    }
}

export default async function CartProductPage(props: PageProps) {
    const {
      params: { product_id },
    } = props;

    const product = await getProductById(product_id);

    return (
      <>
        <p>Product added to your cart!</p>
        <ProductCard href="" product={product} showAddToCart={false} />
      </>
    );
}