import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";

const DeploymentsPage = async () => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    return (
        <div className="h-full flex flex-col space-y-4">
            <h1>Deployments</h1>
        </div>
    );
};

export default DeploymentsPage;