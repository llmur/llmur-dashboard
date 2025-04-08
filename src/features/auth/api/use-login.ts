import {useMutation, useQueryClient} from "@tanstack/react-query";
import {z} from "zod";
import {toast} from "sonner";

import {useRouter} from "next/navigation";
import {loginSchema} from "@/features/auth/schemas";
import {loginAction} from "@/features/auth/server/actions";

type ResponseType = void;
type RequestType = z.infer<typeof loginSchema>;

export const useLogin = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (data) => {
            const response = await loginAction(data);
            if (!response.success) throw new Error(response.error);
        },
        onSuccess: () => {
            toast.success("Logged in successfully");
            router.refresh();
            queryClient.invalidateQueries({queryKey: ["current"]});
        },
        onError: () => {
            toast.error("Failed to login");
        }
    });
    return mutation
}