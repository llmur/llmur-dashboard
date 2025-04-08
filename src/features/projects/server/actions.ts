"use server";

import {z} from "zod";
import {getCurrentUserSession} from "@/lib/auth";
import {createSessionClient} from "@/lib/llmur";
import {createProjectSchema, updateProjectSchema} from "@/features/projects/schemas";
import {Models} from "@/llmur";

export async function getCurrentUserMembershipsAction(): Promise<ServerActionResponse<Models.MembershipList>>  {
    try {
        const current = await getCurrentUserSession()
        const {users} = await createSessionClient();
        const memberships = await users.memberships({id: current.user.id})
        console.log("Memberships: " + JSON.stringify(memberships))
        return {
            success: true,
            data: memberships
        }
    } catch (e) {
        console.log("Mem Error: " + e)
        return {
            success: false,
            error: e instanceof Error ? e.message : "Unknown error"
        }
    }
}

interface GetProjectParams {
    id: string // Project id
}

export async function getProjectAction(id: string): Promise<ServerActionResponse<Models.Project>> {
    try {
        const {projects} = await createSessionClient();
        const project = await projects.get({id});
        return {
            success: true,
            data: project
        }
    } catch (e) {
        return {
            success: false,
            error: e instanceof Error ? e.message : "Unknown error"
        }
    }
}

export async function createProjectAction(data: z.infer<typeof createProjectSchema>): Promise<ServerActionResponse<Models.Project>> {
    try {
        const {name} = createProjectSchema.parse(data);

        const {projects} = await createSessionClient();
        let project = await projects.create({
            name
        })
        return {
            success: true,
            data: project
        }
    } catch (e) {
        console.log("Error 123: " + e)
        return {
            success: false,
            error: e instanceof Error ? e.message : "Unknown error"
        }
    }
}

export async function updateProjectAction(id: string, data: z.infer<typeof updateProjectSchema>) {
    const {name} = updateProjectSchema.parse(data);

    const {projects} = await createSessionClient();
    let project = await projects.patch({id, name});
}