import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {toast} from "sonner";

import {client} from "@/lib/rpc";
import {date} from "zod";

type ResponseType = InferResponseType<typeof client.api.project["invite"][":inviteId"]["$delete"]>;
type RequestType = InferRequestType<typeof client.api.project["invite"][":inviteId"]["$delete"]>;

export const useDeleteInvite = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({param}) => {
            const response = await client.api.project["invite"][":inviteId"]["$delete"]({param});

            if (!response.ok) {
                throw new Error("Failed to delete invite code")
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success("Invite code removed successfully");
            queryClient.invalidateQueries({queryKey: ["invites"]});
        },
        onError: () => {
            toast.error("Failed to delete invite code");
        }
    });
    return mutation
}