import { NextRequest, NextResponse } from "next/server";

export async function logoutAction(req: NextRequest) {
    try {
        req.cookies.delete('auth_token');
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
