import { NextRequest, NextResponse } from "next/server";

export async function logoutAction(req: NextRequest) {
    try {
        req.cookies.delete('auth_token');
        return NextResponse.json(
            {
                sucess: true,
            },
            {
                status: 200,
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
