"use server";

import {Models} from "@/llmur";
import {JWTPayload} from "jose";
import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import {AUTH_COOKIE} from "@/features/auth/constants";

export interface AuthenticatedUser extends JWTPayload {
    user: Models.User
    session: Models.SessionToken
}

const secret = process.env.NEXT_JWT_SECRET!;
const key = new TextEncoder().encode(secret);

async function encrypt(payload: AuthenticatedUser) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("1 hour from now")
        .sign(key)
}

async function decrypt(jwt: string): Promise<AuthenticatedUser> {
    try {
        const {payload} = await jwtVerify<AuthenticatedUser>(jwt, key, {
            algorithms: ["HS256"]
        });
        return payload
    } catch (error) {
        console.log("Failed to decrypt: " + jwt)
        throw new Error("Invalid JWT token")
    }
}

export async function getCurrentUserSession() {
    const cookie = (await cookies()).get(AUTH_COOKIE)

    if (!cookie || !cookie.value) {
        throw new Error("Unauthorized");
    }

    return await decrypt(cookie.value);
}

export async function setSessionCookie(user: Models.User, session: Models.SessionToken) {
    const jwt = await encrypt({user, session});

    (await cookies()).set(AUTH_COOKIE, jwt, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
}

export async function clearSessionCookie() {
    (await cookies()).set(AUTH_COOKIE, "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(0)
    });
}
