import {createAdminClient, createSessionClient} from "@/lib/llmur";

interface GetUserProjectsProps {
    userId: string;
};

interface GetInviteInfoProps {
    code: string;
};

export const listUserProjects = async ({userId}: GetUserProjectsProps) => {
    try {
        const {account} = await createSessionClient();
        return await account.projects({id: userId});
    } catch {
        return {memberships: [], total: 0};
    }
}

interface GetProjectProps {
    projectId: string;
};

export const getProject = async ({projectId}: GetProjectProps) => {
    try {
        const {project} = await createSessionClient();
        return await project.get({id: projectId});
    } catch {
        return null;
    }
}

export const getInviteInfo = async ({code}: GetInviteInfoProps) => {
    try {
        console.log("Creating client")
        const {project} = await createSessionClient();
        console.log("Client Created")
        let result = await project.get_invite_with_code({code});
        console.log(`Got ${result.project_name}`)
        return {
            project_name: result.project_name,
            project_id: result.project_id
        }
    } catch(e) {
        return null;
    }
}