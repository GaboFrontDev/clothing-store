import { NextRequest, NextResponse } from "next/server";
import { UserController } from "../UserController";

const { createUser } = new UserController();

export async function createUserAction(req: NextRequest) {
    try {
        const data = await req.json();
        const user = await createUser(data) as any;
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
