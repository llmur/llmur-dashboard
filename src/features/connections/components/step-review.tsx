import { useFormContext } from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/features/connections/schemas";
import {Provider} from "@/llmur";

export const StepReview = () => {
    const { getValues } = useFormContext<z.infer<typeof formSchema>>();
    const values = getValues();

    return (
        <div>
            <h2 className="text-lg font-semibold">Review Your Information</h2>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify({
                provider: values.provider,
                connection: values.provider === Provider.AzureOpenAi ? values.azureOpenAi : values.openAiV1,
                access: {
                    is_private: values.accessConfig.access === "private",
                    ...(values.accessConfig.access === "private" && { projects: values.accessConfig.projects })
                }
            }, null, 2)}</pre>
        </div>
    );
}