import {
    Client,
    Users, Projects, Connections, Sessions
} from "@/llmur";

import {getCurrentUserSession} from "@/lib/auth";

export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_LLMUR_PROXY_URL!);

    const current = await getCurrentUserSession();

    client.setSession(current.session.token);

    return {
        get users() {
            return new Users(client)
        },
        get sessions() {
            return new Sessions(client)
        },
        get projects() {
            return new Projects(client)
        },
        get connection() {
            return new Connections(client)
        }
    }
}

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_LLMUR_PROXY_URL!)
        .setKey(process.env.NEXT_LLMUR_PROXY_KEY!)

    return {
        get users() {
            return new Users(client)
        },
        get sessions() {
            return new Sessions(client)
        },
        get project() {
            return new Projects(client)
        },
        get connection() {
            return new Connections(client)
        }
    }
}