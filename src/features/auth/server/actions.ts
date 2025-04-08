"use server";

import {z} from "zod";
import {createAdminClient} from "@/lib/llmur";
import {loginSchema, registerSchema} from "@/features/auth/schemas";
import {setSessionCookie, clearSessionCookie} from "@/lib/auth";
import {Models} from "@/llmur";

export async function loginAction(data: z.infer<typeof loginSchema>): Promise<ServerActionResponse<never>> {
    try {
        const {email, password} = loginSchema.parse(data);
        const {sessions, users} = await createAdminClient();
        const session = await sessions.createEmailPasswordSession({email, password});
        const user: Models.User = await users.get({id: session.info.user_id});

        await setSessionCookie(user, session);

        return {success: true};
    } catch (error) {
        return {success: false, error: error instanceof Error ? error.message : "Unknown error"};
    }
}

export async function logoutAction(): Promise<ServerActionResponse<never>> {
    try {
        await clearSessionCookie()
        return {success: true};
    } catch (error) {
        return {success: false, error: error instanceof Error ? error.message : "Unknown error"};
    }
}

export async function registerAction(data: z.infer<typeof registerSchema>):  Promise<ServerActionResponse<never>> {
    try {
        const {email, password} = registerSchema.parse(data);
        const {users} = await createAdminClient();
        await users.create({email, password});
        return {success: true};
    } catch (error) {
        return {success: false, error: error instanceof Error ? error.message : "Unknown error"};
    }
}