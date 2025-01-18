import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import {ConnectionsList} from "@/features/connections/components/connections-list";

const ConnectionsAdminPage = async () => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in");

    return (
        <div className="h-full flex flex-col space-y-4">
            <ConnectionsList canCreateConnection={true}/>
        </div>
    );
};

export default ConnectionsAdminPage;