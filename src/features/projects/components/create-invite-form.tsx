"use client"

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createInviteSchema, createInviteSchemaBuilder} from "@/features/projects/schemas";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-separator";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useCreateProject} from "@/features/projects/api/use-create-project";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {useCreateInvite} from "@/features/projects/api/use-create-invite";
import {ProjectRole} from "@/llmur";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Slider} from "@/components/ui/slider";
import {useState} from "react";
import {Switch} from "@/components/ui/switch";

interface CreateInviteFormProps {
    onCancel?: () => {},
    projectId: string
};

export const CreateInviteForm = ({onCancel, projectId}: CreateInviteFormProps) => {
    const router = useRouter();
    const {mutate, isPending} = useCreateInvite();
    const [value, setValue] = useState<number[]>([10])
    const [enableValidity, setEnableValidity] = useState(false)

    const form = useForm<z.infer<typeof createInviteSchemaBuilder>>({
        resolver: zodResolver(createInviteSchemaBuilder),
        defaultValues: {
            defaultRole: ProjectRole.Guest,
            codeLength: 8,
            enableValidity: false,
            validityNumber: undefined,
            validityUnit: undefined,
        }
    });

    const onSubmit = (values: z.infer<typeof createInviteSchemaBuilder>) => {
        let validityString = values.enableValidity && values.validityNumber && values.validityUnit ?
            `${values.validityNumber}${values.validityUnit}`
            : undefined

        mutate({
            json: {
                defaultRole: values["defaultRole"],
                codeLength: values["codeLength"],
                validity: validityString
            }, param: {projectId}
        }, {
            onSuccess: ({data}) => {
                form.reset();
                router.push(`/project/${projectId}/settings`);
            }
        });
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new Invite Code
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
                                    name="defaultRole"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                {...field}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value={ProjectRole.Guest}>Guest</SelectItem>
                                                    <SelectItem value={ProjectRole.Developer}>Developer</SelectItem>
                                                    <SelectItem value={ProjectRole.Admin}>Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="codeLength"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                <div className="flex items-center justify-between">
                                                    <div>Invite Code Length</div>
                                                    <span className="text-sm font-medium">
                                                      Value: {value[0]}
                                                    </span>
                                                </div>
                                            </FormLabel>
                                            <div className="pt-4">
                                                <FormControl>
                                                    <Slider
                                                        defaultValue={[10]}
                                                        max={32}
                                                        min={6}
                                                        step={1}
                                                        onValueChange={setValue}
                                                    />
                                                </FormControl>
                                                <div
                                                    className="flex justify-between text-sm text-muted-foreground pt-2">
                                                    <span>6</span>
                                                    <span>32</span>
                                                </div>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="enableValidity"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Set invite validity</FormLabel>
                                                <FormDescription>
                                                    Set a validity period for your invite code
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(checked)
                                                        setEnableValidity(checked)
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                {enableValidity && (
                                    <div className="flex space-x-4">
                                        <FormField
                                            control={form.control}
                                            name="validityNumber"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormLabel>Valid for</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            {...field}
                                                            value={field.value === undefined ? "" : field.value}
                                                            onChange={(e) => {
                                                                const value = e.target.value === "" ? undefined : Number(e.target.value);
                                                                field.onChange(value);
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="validityUnit"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormLabel>Unit</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a unit" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="y">Year(s)</SelectItem>
                                                            <SelectItem value="M">Month(s)</SelectItem>
                                                            <SelectItem value="w">Week(s)</SelectItem>
                                                            <SelectItem value="d">Day(s)</SelectItem>
                                                            <SelectItem value="h">Hour(s)</SelectItem>
                                                            <SelectItem value="m">Minute(s)</SelectItem>
                                                            <SelectItem value="s">Second(s)</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
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