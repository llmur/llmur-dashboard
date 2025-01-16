import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";

const UsersAdminPage = async () => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in");

    return (
        <div>
            Users
        </div>
    );
};

export default UsersAdminPage;