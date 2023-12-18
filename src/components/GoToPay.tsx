import Buttons from "./Buttons";

interface AddToCartButtonProps {
  url: string;
}

export default function GoToPayButton(props: AddToCartButtonProps) {
  const { url } = props;

  return (
    <Buttons.Link
      href={url}
      className="border-2 border-emerald-800 active:bg-emerald-800 active:text-white hover:bg-emerald-800 hover:text-white rounded-md px-2"
    >
      Buy now
    </Buttons.Link>
  );
}
