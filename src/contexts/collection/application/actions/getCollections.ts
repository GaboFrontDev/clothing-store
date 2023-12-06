import { NextRequest, NextResponse } from "next/server";
import { CollectionCotroller } from "../CollectionController";

const { getCollections } = new CollectionCotroller<NextRequest>();

export async function getCollectionsAction(req?: NextRequest) {
    try {
        const collections = await getCollections();
        console.log(`Found collections:`)
        console.log(collections)
        if (!req) {
            return collections;
        }
        return NextResponse.json(
            {
                sucess: true,
                result: collections
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