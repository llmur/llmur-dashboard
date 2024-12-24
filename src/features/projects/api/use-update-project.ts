import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {toast} from "sonner";

import {client} from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.project[":projectId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.project[":projectId"]["$patch"]>;

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({json, param}) => {
            const response = await client.api.project[":projectId"]["$patch"]({json, param});

            if (!response.ok) {
                throw new Error("Failed to update project")
            }

            return response.json();
        },
        onSuccess: ({data}) => {
            toast.success("Project updated successfully");
            queryClient.invalidateQueries({queryKey: ["project"]});
            queryClient.invalidateQueries({queryKey: ["project", data.id]});
        },
        onError: () => {
            toast.error("Failed to update project");
        }
    });
    return mutation
}