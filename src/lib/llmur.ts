import "server-only"

import {
    Client,
    Account, Project
} from "@/llmur";
import {cookies} from "next/headers";
import {AUTH_COOKIE} from "@/features/auth/constants";

export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_LLMUR_PROXY_URL!);

    const session = (await cookies()).get(AUTH_COOKIE);

    if (!session || !session.value) {
        throw new Error("Unauthorized");
    }

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client)
        },
        get project() {
            return new Project(client)
        }
    }
}

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_LLMUR_PROXY_URL!)
        .setKey(process.env.NEXT_LLMUR_PROXY_KEY!)

    return {
        get account() {
            return new Account(client)
        },
        get project() {
            return new Project(client)
        }
    }
}