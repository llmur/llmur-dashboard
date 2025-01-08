"use client"

import {ResponsiveModal} from "@/components/responsive-modal";

import {useCreateInviteModal} from "@/features/projects/hooks/use-create-invite-modal";
import {CreateInviteForm} from "@/features/projects/components/create-invite-form";

interface CreateInviteModalProps {
    projectId: string
}

export const CreateInviteModal = ({projectId}: CreateInviteModalProps) => {
    const {isOpen, setIsOpen, close} = useCreateInviteModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateInviteForm onCancel={close} projectId={projectId}/>
        </ResponsiveModal>
    )
}