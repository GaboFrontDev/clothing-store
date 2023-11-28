import CONFIG from "@/config";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

async function isAuthorized(token: string) {
    const privateKey = CONFIG.JWT_SECRET;
    let result = null;
    try {
        result = await jwtVerify(token, new TextEncoder().encode(privateKey));
    } catch (error) {
        return false;
    }

    return !!result;
}
export function authMiddleware(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = (async function (req: NextRequest, ...args: any[]) {
        // Check authentication logic here
        const token = req.cookies.get('verify') as unknown as string;
        if (!token) {
            NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            return;
        }
        const isAuthenticated = await isAuthorized(token);

        if (isAuthenticated) {
            return originalMethod.apply(this, [req, ...args]);
        }
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    });
}
