import {Hono} from "hono";
import {sessionMiddleware} from "@/lib/session-middleware";
import {zValidator} from "@hono/zod-validator";
import {z} from "zod";

const app = new Hono();

export default app;