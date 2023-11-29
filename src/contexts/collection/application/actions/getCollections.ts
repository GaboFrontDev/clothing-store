import { NextRequest, NextResponse } from "next/server";
import { CollectionCotroller } from "../CollectionController";

const {getCollections} = new CollectionCotroller<NextRequest>();

export async function getCollectionsAction(req: NextRequest) {
    try {
        const data = await getCollections();
        return NextResponse.json(
            {
                sucess: true,
                result: data
            },
            {
                status: 201,
            }
        );
    } catch (error) {
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