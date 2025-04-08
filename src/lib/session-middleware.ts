import "server-only"

import {getCookie} from "hono/cookie"
import {createMiddleware} from "hono/factory";

import {
    Client,
    Models,
    Users,
    Sessions,
    Connections,
    Projects,
    type Connections as ConnectionType,
    type Projects as ProjectType,
    type Users as UserType,
    type Sessions as SessionType,
} from "@/llmur";

import {AUTH_COOKIE} from "@/features/auth/constants";

type AdditionalContext = {
    Variables: {
        users: UserType,
        sessions: SessionType,
        projects: ProjectType,
        connections: ConnectionType,

        current_user: Models.User
    }
}

export const sessionMiddleware = createMiddleware<AdditionalContext>(
    async (c, next) => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_LLMUR_PROXY_URL!);

        const session = getCookie(c, AUTH_COOKIE);

        if (!session) {
            return c.json({error: "Unauthorized"}, 401);
        }

        client.setSession(session);

        const users= new Users(client)
        const sessions= new Sessions(client)
        const connections= new Connections(client)
        const projects= new Projects(client)

        const current_user = await users.me();

        c.set("users", users);
        c.set("sessions", sessions);
        c.set("projects", projects);
        c.set("connections", connections);

        c.set("current_user", current_user);

        await next();
    }
);
