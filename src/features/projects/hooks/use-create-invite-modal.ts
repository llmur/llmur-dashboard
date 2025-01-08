import {useQueryState, parseAsBoolean} from "nuqs"

export const useCreateInviteModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
        "create-invite",
        parseAsBoolean.withDefault(false).withOptions({clearOnDefault: true})
    );

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {
        isOpen,
        open,
        close,
        setIsOpen
    };
};