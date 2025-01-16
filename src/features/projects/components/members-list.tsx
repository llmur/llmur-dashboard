"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useProjectId} from "@/features/projects/hooks/use-project-id";
import {Button} from "@/components/ui/button";
import {ArrowLeftIcon, MoreVerticalIcon} from "lucide-react";
import Link from "next/link";
import {DottedSeparator} from "@/components/dotted-separator";
import {useListMembers} from "@/features/projects/api/use-list-members";
import {Fragment} from "react";
import {MemberAvatar} from "@/features/projects/components/member-avatar";
import {Separator} from "@/components/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useDeleteMember} from "@/features/projects/api/use-delete-member";
import {useUpdateMember} from "@/features/projects/api/use-update-member";
import {ProjectRole} from "@/llmur";
import {useConfirm} from "@/hooks/use-confirm";
import {Badge} from "@/components/ui/badge";

const MembersList = () => {
    const projectId = useProjectId();
    const [ConfirmRemoveMemberDialog, confirmRemoveMember] = useConfirm(
        "Remove member",
        "This member will be removed from this project",
        "destructive"
    );

    const {data} = useListMembers({projectId})
    const {
        mutate: deleteMember,
        isPending: isDeletingMember
    } = useDeleteMember();
    const {
        mutate: updateMember,
        isPending: isUpdatingMember
    } = useUpdateMember();

    const handleUpdateMember = (membershipId: string, role: ProjectRole) => {
        updateMember({
            json: {role},
            param: {membershipId}
        })
    };

    const handleDeleteMember = async (membershipId: string) => {
        const ok = await confirmRemoveMember();
        if (!ok) {
            return;
        }
        deleteMember({param: {membershipId}}, {
            onSuccess: () => {
                window.location.reload();
            }
        })
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <ConfirmRemoveMemberDialog/>
            <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
                <CardTitle className="text-xl font-bold">
                    Members list
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                {data?.memberships.map((membership, index) => (
                    <Fragment key={membership.id}>
                        <div className="flex items-center gap-2">
                            <MemberAvatar
                                className="size-10"
                                fallbackClassName="text-lg"
                                name={membership.user_name}/>
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">{membership.user_name}</p>
                            </div>
                            <div className="ml-auto">
                                <Badge
                                    variant= {
                                        membership.role === ProjectRole.Admin ? "destructive" :
                                        membership.role === ProjectRole.Developer ? "default" :
                                        "outline"
                                    }
                                    className="mr-4 mb-2 align-middle"
                                >{membership.role}</Badge>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                        >
                                            <MoreVerticalIcon className="size-4 text-muted-foreground"/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="bottom" align="end">
                                        <DropdownMenuItem
                                            className="font-medium"
                                            onClick={() => handleUpdateMember(membership.id, ProjectRole.Admin)}
                                            disabled={isUpdatingMember}
                                        >
                                            Set as Admin
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="font-medium"
                                            onClick={() => handleDeleteMember(membership.id)}
                                            disabled={isDeletingMember}
                                        >
                                            Set as Member
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="font-medium text-amber-700"
                                            onClick={() => {
                                            }}
                                            disabled={false}
                                        >
                                            Remove {membership.user_name}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        {index < data?.memberships.length - 1 && (
                            <Separator className="my-2.5"/>
                        )}
                    </Fragment>
                ))}
            </CardContent>
        </Card>
    );
};

export default MembersList;