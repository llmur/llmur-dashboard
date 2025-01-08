import {useQuery} from "@tanstack/react-query";

import {client} from "@/lib/rpc";

interface UseListInvitesProps {
    projectId: string
};

export const useListInvites = ({projectId}: UseListInvitesProps) => {
    const query = useQuery({
        queryKey: ["invites"],
        queryFn: async () => {
            const response = await client.api.project[":projectId"]["invites"]["$get"]({ param: {projectId}});

            if (!response.ok) {
                throw new Error("Failed to fetch project invite codes")
            }

            const {data} = await response.json();

            return data
        }
    });
    return query
}