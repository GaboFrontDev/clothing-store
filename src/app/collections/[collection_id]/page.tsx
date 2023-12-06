import { getProductsInCollectionAction } from "@/contexts/collection/application/actions/getProductsInCollection";
import { GetServerSideProps } from "next";
import { useSearchParams } from "next/navigation";

interface PageProps {
    params: {
        collection_id: string;
    };
}


export default async function CollectionIdPage(props: PageProps) {
    const { params: { collection_id } } = props;
    const products = await getProductsInCollectionAction(collection_id);
    if (!Array.isArray(products) || !products.length) {
        return <>La colección no tiene productos :(</>

    }
    return <>
        {products.map((product, index) => <span key={`product-${index}`}>
            {product.attributes.name}
        </span> )}
    </>
}
