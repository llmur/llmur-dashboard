import {useQuery} from "@tanstack/react-query";

import {client} from "@/lib/rpc";
import {getCurrentUserMembershipsAction, getProjectAction} from "@/features/projects/server/actions";
import {Models} from "@/llmur";

interface DetailedMembership {
    membership: Models.Membership;
    project: Models.Project;
}

export const useListMemberships = () => {
    return useQuery({
        queryKey: ["project"],
        queryFn: async () => {
            const response = await getCurrentUserMembershipsAction();

            if(!response.success || !response.data) {
                throw new Error("Failed to fetch memberships")
            }

            const data: DetailedMembership[] = []

            for (const membership of response.data.memberships) {
                const project = await getProjectAction(membership.project_id);
                if (project.success && project.data) {
                    data.push({
                        membership,
                        project: project.data
                    });
                }

            }

            console.log("response", JSON.stringify(data, null, 2));

            return data

        }
    });
}