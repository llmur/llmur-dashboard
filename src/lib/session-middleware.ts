import "server-only"

import {getCookie} from "hono/cookie"
import {createMiddleware} from "hono/factory";

import {
    Client,
    Models,
    Account,
    Connection,
    Project,
    type Connection as ConnectionType,
    type Project as ProjectType,
    type Account as AccountType,
} from "@/llmur";

import {AUTH_COOKIE} from "@/features/auth/constants";

type AdditionalContext = {
    Variables: {
        account: AccountType,
        connection: ConnectionType,
        project: ProjectType,
        user: Models.User
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

        const account= new Account(client)
        const connection= new Connection(client)
        const project= new Project(client)

        const user = await account.get();

        c.set("account", account);
        c.set("connection", connection);
        c.set("project", project);
        c.set("user", user);

        await next();
    }
);