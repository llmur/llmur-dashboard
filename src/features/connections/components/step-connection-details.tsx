import {useFormContext} from "react-hook-form";
import {Provider} from "@/llmur";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {formSchema} from "@/features/connections/schemas";
import {Fragment} from "react";

interface Props {
    provider: Provider;
}

export const StepConnectionDetails = ({provider}: Props) => {
    const form = useFormContext<z.infer<typeof formSchema>>();

    return (
        <Fragment>
            {provider === Provider.AzureOpenAi && (
                <Fragment>
                    <FormField
                        control={form.control}
                        name="azureOpenAi.api_endpoint"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>API Endpoint</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="azureOpenAi.api_key"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>API Key</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="azureOpenAi.deployment_name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Deployment Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="azureOpenAi.azure_openai_api_version"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Api Version</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {/* Add other Azure-specific fields using FormField */}
                </Fragment>
            )}

            {provider === Provider.OpenAiV1 && (
                <>
                    <FormField
                        control={form.control}
                        name="openAiV1.api_endpoint"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>API Endpoint</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="openAiV1.api_key"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>API Key</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="openAiV1.model"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Model</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {/* Add other OpenAI-specific fields using FormField */}
                </>
            )}
        </Fragment>
    );
}