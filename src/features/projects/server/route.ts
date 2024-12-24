import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {createProjectSchema, updateProjectSchema} from "@/features/projects/schemas";
import {sessionMiddleware} from "@/lib/session-middleware";
import {ProjectRole} from "@/llmur";
import {z} from "zod";

const app = new Hono()
    .get("/",
        sessionMiddleware,
        async (c) => {
            const {id} = c.get("user");
            const account = c.get("account");

            const lst = await account.projects({id});

            return c.json({data: lst});
        }
    )
    .post(
        "/",
        zValidator("json", createProjectSchema),
        sessionMiddleware,
        async (c) => {
            const project = c.get("project");

            const {name} = c.req.valid("json");

            const new_project = await project.create({name});

            return c.json({data: new_project});
        }
    )
    .patch(
        "/:projectId",
        zValidator("json", updateProjectSchema),
        sessionMiddleware,
        async (c) => {
            const projectId = c.req.param('projectId')
            const project = c.get("project");

            const {name} = c.req.valid("json");

            const updated_project = await project.patch({id: projectId, name});

            return c.json({data: updated_project});
        }
    )
    .delete(
        "/:projectId",
        sessionMiddleware,
        async (c) => {
            const projectId = c.req.param('projectId')
            const project = c.get("project");

            await project.delete({id: projectId});

            return c.json({data: {id: projectId}})
        }
    )
    .get("/:projectId/members",
        sessionMiddleware,
        async (c) => {
            const projectId = c.req.param('projectId')
            const project = c.get("project");

            const lst = await project.members({id: projectId});

            return c.json({data: lst});
        }
    )
    .delete("/membership/:membershipId",
        sessionMiddleware,
        async (c) => {
            const project = c.get("project")
            const membershipId = c.req.param('membershipId')

            //const lst = await project.members({id: projectId});
            // TODO
            return c.json({data: null});
        }
    )
    .patch("/membership/:membershipId",
        sessionMiddleware,
        zValidator("json", z.object({role: z.nativeEnum(ProjectRole)})),
        async (c) => {
            const project = c.get("project")
            const membershipId = c.req.param('membershipId')
            const {role} = c.req.valid("json")

            //const lst = await project.members({id: projectId});
            // TODO
            return c.json({data: null});
        }
    );

export default app;