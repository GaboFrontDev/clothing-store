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
    return <>Hi</>;
}