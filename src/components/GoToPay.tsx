import Buttons from "./Buttons";

interface AddToCartButtonProps {
  url: string;
}

export default function GoToPayButton(props: AddToCartButtonProps) {
  const { url } = props;
  console.log({ url });
  
  return (
    <Buttons.Link
      href={url}
      className="border-2 border-emerald-800 active:bg-emerald-800 active:text-white hover:bg-emerald-800 hover:text-white rounded-md px-2"
      target="_blank"
    >
      Buy now
    </Buttons.Link>
  );
}
