import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {useRouter} from "next/navigation";
import {createProjectAction} from "@/features/projects/server/actions";
import {z} from "zod";
import {createProjectSchema} from "@/features/projects/schemas";
import {Models} from "@/llmur";

type ResponseType = Models.Project;
type RequestType = z.infer<typeof createProjectSchema>;

export const useCreateProject = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (data) => {
            const response = await createProjectAction(data);
            if (!response.success || !response.data) throw new Error("Failed to create project")
            return response.data;
        },
        onSuccess: () => {
            toast.success("Project created successfully");
            router.refresh();
            queryClient.invalidateQueries({queryKey: ["project"]});
        },
        onError: () => {
            toast.error("Failed to create project");
        }
    });
    return mutation
}