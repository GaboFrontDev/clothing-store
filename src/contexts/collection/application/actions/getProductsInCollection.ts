import { NextRequest, NextResponse } from "next/server";
import { CollectionCotroller } from "../CollectionController";

const { getProductsInCollection } = new CollectionCotroller<NextRequest>();

export async function getProductsInCollectionAction(collection_id: string, req?: NextRequest) {
    try {
        const {data: products} = await getProductsInCollection(collection_id);
        console.log(`Found collections:`)
        console.log(products)
        if (!req) {
            return products;
        }
        return NextResponse.json(
            {
                sucess: true,
                result: products
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log(`getCollections error: ${error}`);
        if (!req) {
            
            return [];
        }

        return NextResponse.json(
            {
                sucess: false,
            },
            {
                status: 500,
            }
        );
    }
}