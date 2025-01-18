import {useMedia} from "react-use";

import {
    Dialog,
    DialogContent, DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent, DrawerTitle,
} from "@/components/ui/drawer";

interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({children, open, onOpenChange}: ResponsiveModalProps) => {
    const isDesktop = useMedia("(min-width: 1024px)", true);

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className="w-full sm:max-w-2xl p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh] rounded-md">
                    <DialogTitle title="Modal title" hidden/>
                    {children}
                </DialogContent>
            </Dialog>
        );
    } else {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent className="overflow-y-auto hide-scrollbar max-h-[85vh] p-0 border-none rounded-md m-0">
                    <DrawerTitle title="Modal title" hidden/>
                    {children}
                </DrawerContent>
            </Drawer>
        );
    }
};


