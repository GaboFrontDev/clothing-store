import { NextRequest, NextResponse } from "next/server";
import { CollectionCotroller } from "../CollectionController";

const { getProductsInCollection } = new CollectionCotroller<NextRequest>();

export async function getCollectionByIdAction(collection_id: string, req?: NextRequest) {
    try {
        const collection = await getProductsInCollection(collection_id);
        console.log(`Found collections:`)
        console.log(collection)
        if (!req) {
            return collection;
        }
        return NextResponse.json(
            {
                sucess: true,
                result: collection
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log(`getCollections error: ${error}`);
        if (!req) {
            return {
                error: true
            };
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