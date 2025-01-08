import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {createInviteSchema, createProjectSchema, updateProjectSchema} from "@/features/projects/schemas";
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
    )
    .post("/:projectId/invite",
        sessionMiddleware,
        zValidator("json", createInviteSchema),
        async (c) => {
            const project = c.get("project")
            const projectId = c.req.param('projectId')

            const {defaultRole, codeLength, validity} = c.req.valid("json")

            const invite = await project.create_invite_code(
                {
                    projectId,
                    role: defaultRole,
                    codeLength,
                    validity,
                });

            return c.json({data: invite});
        }
    )
    .get("/:projectId/invites",
        sessionMiddleware,
        async (c) => {
            const project = c.get("project")
            const projectId = c.req.param('projectId')

            const invite = await project.invite_codes({
                id: projectId
            });

            return c.json({data: invite});
        }
    )
    .delete("/invite/:inviteId",
        sessionMiddleware,
        async (c) => {
            const project = c.get("project")
            const inviteId = c.req.param('inviteId')

            const id = await project.delete_invite({id: inviteId});

            return c.json({data: null});
        }
    )
    .post("join",
        sessionMiddleware,
        zValidator("json", z.object({code: z.string()})),
        async (c) => {
            const {code} = c.req.valid('json');
            const project = c.get("project");

            const membership = await project.join_with_code({code})

            return c.json({data: membership});
        }
    );

export default app;