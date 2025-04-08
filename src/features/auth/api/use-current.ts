import {useQuery} from "@tanstack/react-query";

import {getCurrentUserSession} from "@/lib/auth";

export const useCurrent = () => {
    const query = useQuery({
        queryKey: ["current"],
        queryFn: async () => {
            try {
                return await getCurrentUserSession();
            }
            catch (error) {
                return null;
            }
        }
    });
    return query
}