import Buttons from "./Buttons";

interface AddToCartButtonProps {
    productId: string | number
}

export default function AddToCartButton(props: AddToCartButtonProps) {
    const {productId} = props;
    
    return (
      <Buttons.Link
        href={`/cart/add/${productId}`}
        className="border-2 border-emerald-800 active:bg-emerald-800 active:text-white hover:bg-emerald-800 hover:text-white rounded-md px-2"
      >
        Add to cart
      </Buttons.Link>
    );
}