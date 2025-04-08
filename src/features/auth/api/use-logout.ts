import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {toast} from "sonner";

import {client} from "@/lib/rpc";
import {useRouter} from "next/navigation";
import {logoutAction} from "@/features/auth/server/actions";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await logoutAction();
            if (!response.success) throw new Error(response.error);
            return {success: true};
        },
        onSuccess: () => {
            toast.success("Logged out successfully");
            router.refresh();
            queryClient.invalidateQueries();
        },
        onError: () => {
            toast.error("Failed to logout");
        }
    });
    return mutation
}