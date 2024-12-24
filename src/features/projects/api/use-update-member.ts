import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {toast} from "sonner";

import {client} from "@/lib/rpc";
import {date} from "zod";

type ResponseType = InferResponseType<typeof client.api.project["membership"][":membershipId"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.project["membership"][":membershipId"]["$patch"]>;

export const useUpdateMember = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({param, json}) => {
            const response = await client.api.project["membership"][":membershipId"]["$patch"]({param, json});

            if (!response.ok) {
                throw new Error("Failed to update member")
            }

            return response.json();
        },
        onSuccess: () => {
            toast.success("Member updated successfully");
            queryClient.invalidateQueries({queryKey: ["members"]});
        },
        onError: () => {
            toast.error("Failed to update member");
        }
    });
    return mutation
}