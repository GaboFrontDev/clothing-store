import { NextRequest, NextResponse } from "next/server";
import { UserLoginController } from "../UserLoginController";

const { login } = new UserLoginController();

export async function loginUserAction(req: NextRequest) {
    try {
        const data = await req.json() as unknown as LoginEntity;
        const user = await login(data) as any;
        req.cookies.set('authentication_token', user)
        return NextResponse.json(
            {
                sucess: true,
                result: {
                    ...user,
                    password: null,
                },
                message: "Verification email has been sent to your mail box"
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
