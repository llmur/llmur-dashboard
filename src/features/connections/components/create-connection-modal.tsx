"use client"

import {ResponsiveModal} from "@/components/responsive-modal";

import {useCreateConnectionModal} from "@/features/connections/hooks/use-create-connection-modal";
import {CreateConnectionMultiStepForm} from "@/features/connections/components/create-connection-multi-step-form";

interface CreateConnectionModalModalProps {}

export const CreateConnectionModal = ({}: CreateConnectionModalModalProps) => {
    const {isOpen, setIsOpen, close} = useCreateConnectionModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateConnectionMultiStepForm onCancel={close} />
        </ResponsiveModal>
    )
}