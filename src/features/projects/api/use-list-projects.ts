import {useQuery} from "@tanstack/react-query";

import {client} from "@/lib/rpc";

export const useListProjects = () => {
    const query = useQuery({
        queryKey: ["project"],
        queryFn: async () => {
            const response = await client.api.project["$get"]();

            if (!response.ok) {
                throw new Error("Failed to fetch projects")
            }

            const { data } = await response.json();

            return data
        }
    });
    return query
}