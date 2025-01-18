import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {toast} from "sonner";

import {client} from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.connection["$post"]>;
type RequestType = InferRequestType<typeof client.api.connection["$post"]>;

export const useCreateConnection = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({json}) => {
            const response = await client.api.connection["$post"]({json});

            if(!response.ok) {
                throw new Error("Failed to create connection");
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success("Connection created successfully");
            queryClient.invalidateQueries({queryKey: ["connections"]});
        },
        onError: () => {
            toast.error("Failed to create connection");
        }
    });
    return mutation
}