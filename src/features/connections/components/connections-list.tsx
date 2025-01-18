"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-separator";
import {Fragment} from "react";
import {MemberAvatar} from "@/features/projects/components/member-avatar";
import {Separator} from "@/components/ui/separator";
import {useConfirm} from "@/hooks/use-confirm";
import {Badge} from "@/components/ui/badge";
import {useListAllConnections} from "@/features/connections/api/use-list-all-connections";
import {ProviderAvatar} from "@/components/provider-avatar";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {CopyIcon, TrashIcon} from "lucide-react";
import {useCreateConnectionModal} from "@/features/connections/hooks/use-create-connection-modal";
import {CreateConnectionModal} from "@/features/connections/components/create-connection-modal";

interface ConnectionsListProps {
    canCreateConnection?: boolean;
}

export const ConnectionsList = ({canCreateConnection}: ConnectionsListProps) => {
    const [ConfirmRemoveConnectionDialog, confirmRemoveConnection] = useConfirm(
        "Remove connection",
        "This connection will be removed permanently. This will affect all deployments that might still be using it. Are you sure you want to remove this connection?",
        "destructive"
    );

    const {data} = useListAllConnections({});
    const {open: openCreateConnectionModal} = useCreateConnectionModal();

    /*const {
        mutate: deleteConnection,
        isPending: isDeletingConnection
    } = () => {}; //useDeleteConnection();

    const handleDeleteConnection = async (connectionId: string) => {
        const ok = await confirmRemoveConnection();
        if (!ok) {
            return;
        }
        deleteConnection({param: {connectionId}}, {
            onSuccess: () => {
                window.location.reload();
            }
        })
    }*/

    return (
        <div className="flex flex-col gap-y-4">
            <CreateConnectionModal/>
            <ConfirmRemoveConnectionDialog/>
            <Card className="w-full h-full border-none shadow-none">
                <CardHeader className="p-7">
                    <CardTitle className="text-xl font-bold">
                        Connections
                    </CardTitle>
                    <CardDescription>
                        Setup and manage connections for all the projects.
                    </CardDescription>
                </CardHeader>
                <div className="px-7">
                    <DottedSeparator/>
                </div>
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        {data && data.total > 0 ? (
                            <Table className="mt-4">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[400px]">Provider</TableHead>
                                        <TableHead>Alias</TableHead>
                                        <TableHead>Endpoint</TableHead>
                                        <TableHead className="text-right">Options</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.connections.map((connection) => (
                                        <TableRow key={connection.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-x-2">
                                                    <ProviderAvatar provider={connection.provider}/>
                                                    <span>{connection.provider}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{connection.alias}</TableCell>
                                            <TableCell>
                                                {connection.api_endpoint}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-right">
                                                    <Button
                                                        onClick={() => {
                                                        }}
                                                        variant="destructive"
                                                        className="size-10"
                                                        disabled={false}
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
                            <div className="my-4">
                                <p>No Connection available</p>
                            </div>
                        )}

                        <DottedSeparator className="py-7"/>

                        <Button
                            onClick={openCreateConnectionModal}
                            size="lg"
                            variant="default"
                            disabled={false}
                        >New Connection</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
