import ProductCard from "@/components/ProductCard";
import { getUserCartAction } from "@/contexts/cart/application/actions/getUserCart";
import { createUserCartActions } from "@/contexts/cart/application/actions/createUserCart";
import { getProductById } from "@/contexts/cart/application/helpers/productsInventoryQueries";
import { cookies } from "next/headers";
import { AuthenticationError } from "@/utils/errors/AuthenticationError";
import { redirect } from 'next/navigation'
import { CookieError } from "@/utils/errors/CookieError";
import { CookieCartError } from "@/utils/errors/CookieCartError";

interface PageProps {
  params: {
    product_id: string;
  };
}

export default async function CartProductPage(
  props: PageProps
) {
  const {
    params: { product_id },
  } = props;

  const cookieStore = cookies();
  
  const product = await getProductById(
    product_id
  );

  try {
    const cart = await getUserCartAction(
      undefined,
      cookieStore
    );
  
    if (!cart) {
      console.log('creating cart');
      await createUserCartActions(
        undefined,
        cookieStore
      );
    }

  }

  catch (error) {
    
    if(error instanceof AuthenticationError) {
      console.log({error});
      redirect(
        `/login?redirect_to=cart_add_${product_id}`
      );
    }

    if(error instanceof CookieError) {
      throw Error("CookieError not implemented");
    }

    if(error instanceof CookieCartError) {
      throw Error("CookieCartError handler not implemented");
    }
  }

  return (
    <>
      <p>Product added to your cart!</p>
      <ProductCard
        href=""
        product={product}
        showAddToCart={false}
        showPayUrl={false}
      />
    </>
  );
}
