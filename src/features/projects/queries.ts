import {createSessionClient} from "@/lib/llmur";

interface GetUserProjectsProps {
    userId: string;
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