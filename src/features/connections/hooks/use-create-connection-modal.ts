import {useQueryState, parseAsBoolean} from "nuqs"

export const useCreateConnectionModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
        "create-connection",
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