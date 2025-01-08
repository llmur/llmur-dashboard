import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {toast} from "sonner";

import {client} from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.project["join"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.project["join"]["$post"]>;

export const useJoinProject = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({json}) => {
            const response = await client.api.project["join"]["$post"]({json});

            if (!response.ok) {
                throw new Error("Failed to join project")
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success("Joined project successfully");
            queryClient.invalidateQueries({queryKey: ["projects"]});
        },
        onError: () => {
            toast.error("Failed to join project");
        }
    });
    return mutation
}