import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {toast} from "sonner";

import {client} from "@/lib/rpc";
import {date} from "zod";

type ResponseType = InferResponseType<typeof client.api.project["membership"][":membershipId"]["$delete"]>;
type RequestType = InferRequestType<typeof client.api.project["membership"][":membershipId"]["$delete"]>;

export const useDeleteMember = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({param}) => {
            const response = await client.api.project["membership"][":membershipId"]["$delete"]({param});

            if (!response.ok) {
                throw new Error("Failed to delete member")
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success("Member removed successfully");
            queryClient.invalidateQueries({queryKey: ["members"]});
        },
        onError: () => {
            toast.error("Failed to delete member");
        }
    });
    return mutation
}