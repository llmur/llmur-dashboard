"use client"

import {createAzureOpenAiConnectionSchema} from "@/features/connection/schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-separator";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useCreateAzureOpenaiConnection} from "@/features/connection/api/use-create-azure-openai-connection";

interface CreateConnectionFormProps {
    onCancel?: () => {}
};

export const CreateConnectionForm = ({onCancel}: CreateConnectionFormProps) => {
    const {mutate, isPending} = useCreateAzureOpenaiConnection();

    const form = useForm<z.infer<typeof createAzureOpenAiConnectionSchema>>({
        resolver: zodResolver(createAzureOpenAiConnectionSchema),
        defaultValues: {
            api_endpoint: "",
            api_key: "",
            deployment_name: "",
            api_version: undefined
        }
    })

    const onSubmit = (values: z.infer<typeof createAzureOpenAiConnectionSchema>) => {
        mutate({json: values});
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new Connection
                </CardTitle>

            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
                <CardContent className="p-7">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-y-4">
                                <FormField
                                    control={form.control}
                                    name="api_endpoint"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>API Endpoint</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Connection Endpoint"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DottedSeparator className="py-7"/>
                            <div className="flex items-center justify-between">
                                <Button
                                    type="button"
                                    size="lg"
                                    variant="secondary"
                                    onClick={onCancel}
                                    disabled={isPending}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    variant="default"
                                    disabled={isPending}
                                >
                                    Create Connection
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </div>
        </Card>
    )
}