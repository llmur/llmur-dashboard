import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {useRouter} from "next/navigation";
import {loginAction, registerAction} from "@/features/auth/server/actions";
import {z} from "zod";
import {registerSchema} from "@/features/auth/schemas";

type ResponseType = void;
type RequestType = z.infer<typeof registerSchema>;

export const useRegister = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (data) => {
            const response = await registerAction(data);

            if (!response.success) {
                throw new Error(response.error);
            }

            await loginAction({
                email: data.email,
                password: data.password
            })
        },
        onSuccess: () => {
            toast.success("Account created successfully");
            router.refresh();
            queryClient.invalidateQueries({queryKey: ["current"]});
        },
        onError: () => {
            toast.error("Failed to create account");
        }
    });
    return mutation
}