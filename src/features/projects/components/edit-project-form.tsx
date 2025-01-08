"use client"

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateProjectSchema} from "@/features/projects/schemas";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-separator";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {cn, convertTimestampToDateTime} from "@/lib/utils";
import {Models} from "@/llmur";
import {useUpdateProject} from "@/features/projects/api/use-update-project";
import {ArrowLeftIcon, CopyIcon, TrashIcon} from "lucide-react";
import {useConfirm} from "@/hooks/use-confirm";
import {useDeleteProject} from "@/features/projects/api/use-delete-project";
import {useDeleteInvite} from "@/features/projects/api/use-delete-invite";
import {useListInvites} from "@/features/projects/api/use-list-invites";
import {Fragment} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {toast} from "sonner";
import {CreateInviteModal} from "@/features/projects/components/create-invite-modal";
import {useCreateProjectModal} from "@/features/projects/hooks/use-create-project-modal";
import {useCreateInviteModal} from "@/features/projects/hooks/use-create-invite-modal";

interface EditProjectFormProps {
    onCancel?: () => {};
    initialValues: Models.Project;
};

export const EditProjectForm = ({onCancel, initialValues}: EditProjectFormProps) => {
    const router = useRouter();
    const {
        mutate: updateProject,
        isPending: isUpdatingProject
    } = useUpdateProject();
    const {
        mutate: deleteProject,
        isPending: isDeletingProject
    } = useDeleteProject();
    const {
        mutate: deleteInvite,
        isPending: isDeletingInvite
    } = useDeleteInvite();

    const [DeleteDialog, confirmDelete] = useConfirm(
        "Delete Project",
        "This action is permanent and cannot be undone",
        "destructive"
    );

    const [DeleteInvite, confirmInviteDelete] = useConfirm(
        "Delete Invite Code",
        "This action is permanent and cannot be undone",
        "destructive"
    );

    const form = useForm<z.infer<typeof updateProjectSchema>>({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            ...initialValues
        }
    });

    const handleDelete = async () => {
        const ok = await confirmDelete();

        if (!ok) return;

        deleteProject({
            param: {projectId: initialValues.id},
        }, {
            onSuccess: () => {
                window.location.href = "/"
            },
        });
    };

    const handleDeleteInvite = async (id: string) => {
        const ok = await confirmInviteDelete();

        if (!ok) return;

        deleteInvite({
            param: {inviteId: id},
        }, {
            onSuccess: () => {
                router.refresh();
            },
        });
    };

    const onSubmit = (values: z.infer<typeof updateProjectSchema>) => {
        updateProject({
            json: values,
            param: {projectId: initialValues.id}
        }, {
            onSuccess: ({data}) => {
                form.reset();
                router.push(`/project/${data.id}`);
            }
        });
    };

    const {data: invites} = useListInvites({projectId: initialValues.id})

    const {open: openCreateInviteModal} = useCreateInviteModal();

    const inviteLinkPrefix = `${window.location.origin}/project/join`

    const handleCopyInviteLink = (value: string) => {
        navigator.clipboard.writeText(value)
            .then(() => toast.success("Link copied to clipboard"))
    }

    return (
        <div className="flex flex-col gap-y-4">
            <DeleteDialog/>
            <DeleteInvite/>
            <CreateInviteModal projectId={initialValues.id}/>
            <Card className="w-full h-full border-none shadow-none">
                <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
                    <Button size="sm" variant="secondary"
                            onClick={onCancel ? onCancel : () => router.push(`/project/${initialValues.id}`)}>
                        <ArrowLeftIcon className="size-4 mr-2"/>
                        Back
                    </Button>

                    <CardTitle className="text-xl font-bold">
                        Update {initialValues.name} project
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
                                        disabled={isUpdatingProject}
                                        className={cn(!onCancel && "invisible")}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        variant="default"
                                        disabled={isUpdatingProject}
                                    >
                                        Save changes
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </div>
            </Card>
            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">Invite Codes</h3>
                        <p className="text-sm text-muted-foreground">
                            Create and manage invite codes to easily add members to this project.
                        </p>

                        {invites && invites.total > 0 ? (
                            <Table className="mt-4">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[400px]">Link</TableHead>
                                        <TableHead>Assigns Role</TableHead>
                                        <TableHead>Valid Until</TableHead>
                                        <TableHead className="text-right">Delete</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invites.invites.map((invite) => (
                                        <TableRow key={invite.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-x-2">
                                                    <Input disabled value={`${inviteLinkPrefix}/${invite.code}`}/>
                                                    <Button
                                                        onClick={() => handleCopyInviteLink(`${inviteLinkPrefix}/${invite.code}`)}
                                                        variant="secondary"
                                                        className="size-10"
                                                    >
                                                        <CopyIcon className="size-5"/>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell>{invite.assign_role}</TableCell>
                                            <TableCell>
                                                {invite.valid_until
                                                    ? convertTimestampToDateTime(invite.valid_until)?.toLocaleString("default", {
                                                        year: "numeric",
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        second: "2-digit",
                                                        hour12: false, // Ensures 24-hour format
                                                    }).replace(",", "") // Optional: Remove the comma if any
                                                    : "∞"}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-right">
                                                    <Button
                                                        onClick={() => handleDeleteInvite(invite.id)}
                                                        variant="destructive"
                                                        className="size-10"
                                                        disabled={isUpdatingProject || isDeletingInvite}
                                                    >
                                                        <TrashIcon className="size-5"/>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="mt-4">
                                <p>No Invite code available</p>
                            </div>
                        )}

                        <DottedSeparator className="py-7"/>

                        <Button
                            onClick={openCreateInviteModal}
                            size="lg"
                            variant="default"
                            disabled={isUpdatingProject}
                        >New Invite Link</Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">Danger Zone</h3>
                        <p className="text-sm text-muted-foreground">
                            Deleting a project is irreversible and will also remove all associated resources.
                        </p>

                        <DottedSeparator className="py-7"/>

                        <Button
                            size="lg"
                            variant="destructive"
                            type="button"
                            disabled={isUpdatingProject || isDeletingProject}
                            onClick={handleDelete}
                        >Delete</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}