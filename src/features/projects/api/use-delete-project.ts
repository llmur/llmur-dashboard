import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {toast} from "sonner";

import {client} from "@/lib/rpc";
import {date} from "zod";

type ResponseType = InferResponseType<typeof client.api.project[":projectId"]["$delete"]>;
type RequestType = InferRequestType<typeof client.api.project[":projectId"]["$delete"]>;

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({param}) => {
            const response = await client.api.project[":projectId"]["$delete"]({param});

            if (!response.ok) {
                throw new Error("Failed to delete project")
            }

            return response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Project deleted successfully");
            queryClient.invalidateQueries({queryKey: ["project"]});
            queryClient.invalidateQueries({queryKey: ["project", data.id]});
        },
        onError: () => {
            toast.error("Failed to delete project");
        }
    });
    return mutation
}