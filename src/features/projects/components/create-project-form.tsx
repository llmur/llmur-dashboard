"use client"

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createProjectSchema} from "@/features/projects/schemas";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-separator";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useCreateProject} from "@/features/projects/api/use-create-project";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

interface CreateProjectFormProps {
    onCancel?: () => {}
};

export const CreateProjectForm = ({onCancel}: CreateProjectFormProps) => {
    const router = useRouter();
    const {mutate, isPending} = useCreateProject();

    const form = useForm<z.infer<typeof createProjectSchema>>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = (values: z.infer<typeof createProjectSchema>) => {
        mutate({json: values}, {
            onSuccess: ({ data }) => {
                form.reset();
                router.push(`/project/${data.id}`);
            }
        });
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new Project
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
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Project Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Project Name"
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
                                    className={cn(!onCancel && "invisible")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    variant="default"
                                    disabled={isPending}
                                >
                                    Create Project
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </div>
        </Card>
    )
}