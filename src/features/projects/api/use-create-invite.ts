import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {toast} from "sonner";

import {client} from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.project[":projectId"]["invite"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.project[":projectId"]["invite"]["$post"]>;

export const useCreateInvite = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({json, param}) => {
            const response = await client.api.project[":projectId"]["invite"]["$post"]({json, param});

            if (!response.ok) {
                throw new Error("Failed to create invite code")
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success("Invite code created successfully");
            queryClient.invalidateQueries({queryKey: ["invites"]});
        },
        onError: () => {
            toast.error("Failed to create invite code");
        }
    });
    return mutation
}