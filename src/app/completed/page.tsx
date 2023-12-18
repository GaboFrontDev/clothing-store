import { createOrderAction } from "@/contexts/order/application/actions/createOrder";

interface PageProps {
  searchParams: {
    sid: string;
  };
}

export default function CompletedPage(props: PageProps) {
    const {
      searchParams: { sid: session_id },
    } = props;
    return (
      <>
        <h1 className="text-4xl">Muchas gracias por su compra</h1>
        <p className="text-xl py-10"> 
          Recibirás actualizaciones por correo electrónico con
          la guía de envío
        </p>
      </>
    );
}