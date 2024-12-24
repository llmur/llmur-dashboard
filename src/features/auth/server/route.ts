import {Hono} from "hono";
import {z} from "zod";
import {zValidator} from "@hono/zod-validator"
import {loginSchema, registerSchema} from "@/features/auth/schemas";
import {createAdminClient} from "@/lib/llmur";
import {deleteCookie, setCookie} from "hono/cookie";
import {AUTH_COOKIE} from "@/features/auth/constants";
import {sessionMiddleware} from "@/lib/session-middleware";

const app = new Hono()
    .get("/current", sessionMiddleware, (c) =>{
        const user = c.get("user");
        return c.json({ data: user });
    })
    .post("/login",
        zValidator("json", loginSchema),

        async (c) => {
            const { email, password} = c.req.valid("json");

            const { account } = await createAdminClient();

            const session = await account.createEmailPasswordSession(
                {
                    email: email,
                    password: password
                }
            );

            setCookie(c, AUTH_COOKIE, session.token, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
            })

            return c.json({ success: true });
        })
    .post("/register",
        zValidator("json", registerSchema),

        async (c) => {
            const { email, password} = c.req.valid("json");

            const { account } = await createAdminClient();

            await account.create(
                {
                    email: email,
                    password: password
                }
            );

            const session = await account.createEmailPasswordSession(
                {
                    email: email,
                    password: password
                }
            );

            setCookie(c, AUTH_COOKIE, session.token, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
            })

            return c.json({ success: true });
        })
    .post("/logout", sessionMiddleware,(c) => {
        //const account = c.get("account");
        deleteCookie(c, AUTH_COOKIE);
        //await account.deleteSession("current")
        return c.json({ success: true });
    });

export default app;