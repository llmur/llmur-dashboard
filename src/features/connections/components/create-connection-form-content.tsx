import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {createAzureOpenAiConnectionSchema, createOpenAiV1ConnectionSchema} from "@/features/connections/schemas";
import {AzureOpenAiApiVersion, Provider} from "@/llmur";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type AzureOpenAiForm = z.infer<typeof createAzureOpenAiConnectionSchema>
type OpenAiV1Form = z.infer<typeof createOpenAiV1ConnectionSchema>

interface CreateConnectionFormContentProps {
    onSubmit: (data: AzureOpenAiForm | OpenAiV1Form) => void;
    provider: Provider;
    initialData: Partial<AzureOpenAiForm & OpenAiV1Form>;
}

export const CreateConnectionFormContent = ({onSubmit, provider, initialData}: CreateConnectionFormContentProps) => {
    const schema = provider === Provider.AzureOpenAi ? createAzureOpenAiConnectionSchema : createOpenAiV1ConnectionSchema

    const form = useForm<AzureOpenAiForm | OpenAiV1Form>({
        resolver: zodResolver(schema),
        defaultValues: initialData,
    })

    const handleSubmit: SubmitHandler<AzureOpenAiForm | OpenAiV1Form> = (data) => {
        console.log('Submitting data for review:', data)
        onSubmit(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                {provider === Provider.AzureOpenAi ? (
                    <>
                        <FormField
                            control={form.control}
                            name="api_endpoint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Api Endpoint</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Endpoint" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="deployment_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deployment Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Deployment" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="azure_openai_api_version"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Api Version</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
//                                        defaultValue={field.value}
                                        {...field}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(AzureOpenAiApiVersion).map(value => (
                                                <SelectItem key={value} value={value}>{value}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="api_key"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Api Key</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Key" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                ) : (
                    <>
                        <FormField
                            control={form.control}
                            name="api_endpoint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Api Endpoint</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Endpoint" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Model</FormLabel>
                                    <FormControl>
                                        <Input placeholder="model" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="api_key"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Api Key</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Key" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}
                <Button type="submit">Next</Button>
            </form>
        </Form>
    )
}