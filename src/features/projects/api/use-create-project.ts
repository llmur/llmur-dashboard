import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {toast} from "sonner";

import {client} from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.project["$post"]>;
type RequestType = InferRequestType<typeof client.api.project["$post"]>;

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({json}) => {
            const response = await client.api.project["$post"]({json});

            if (!response.ok) {
                throw new Error("Failed to create project")
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success("Project created successfully");
            queryClient.invalidateQueries({queryKey: ["project"]});
        },
        onError: () => {
            toast.error("Failed to create project");
        }
    });
    return mutation
}