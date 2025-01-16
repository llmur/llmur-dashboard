import {useQuery} from "@tanstack/react-query";

import {client} from "@/lib/rpc";

interface UseListMembersProps {
    projectId: string
};

export const useListMembers = ({projectId}: UseListMembersProps) => {
    const query = useQuery({
        queryKey: ["members"],
        queryFn: async () => {
            const response = await client.api.project[":projectId"]["members"]["$get"]({ param: {projectId}});

            if (!response.ok) {
                throw new Error("Failed to fetch members")
            }

            const {data} = await response.json();

            return data
        }
    });
    return query
}