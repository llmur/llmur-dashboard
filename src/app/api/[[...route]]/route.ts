import {Hono} from "hono"
import {handle} from "hono/vercel"

import auth from "@/features/auth/server/route"
import connection from "@/features/connections/server/route"
import project from "@/features/projects/server/route"
import members from "@/features/projects/server/route"
import deployment from "@/features/deployments/server/route"

const app = new Hono().basePath("/api");

const routes = app
    .route("/auth", auth)
    .route("/connection", connection)
    .route("/project", project)
    .route("/members", members)
    .route("/deployment", deployment);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;