import {useQuery} from "@tanstack/react-query";

import {client} from "@/lib/rpc";

interface UseListAllConnectionsProps {};

export const useListAllConnections = ({}: UseListAllConnectionsProps) => {
    const query = useQuery({
        queryKey: ["connections"],
        queryFn: async () => {
            const response = await client.api.connection["$get"]();

            if (!response.ok) {
                throw new Error("Failed to fetch connections")
            }

            const {data} = await response.json();

            return data
        }
    });
    return query
}