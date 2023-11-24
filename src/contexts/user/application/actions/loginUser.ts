import { NextRequest, NextResponse } from "next/server";
import { UserLoginController } from "../UserLoginController";

const { getLoginTokenOrFail } = new UserLoginController();

export async function loginUserAction(req: NextRequest) {
    try {
        const data = await req.json() as unknown as LoginEntity;
        const token = await getLoginTokenOrFail(data) as any;
        req.cookies.set('authentication_token', token)
        return NextResponse.json(
            {
                sucess: true,
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
