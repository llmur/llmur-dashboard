import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import MembersList from "@/features/projects/components/members-list";

const ProjectMembersPage = async () => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    return (
        <div className="h-full flex flex-col space-y-4">
            <MembersList/>
        </div>
    );
};

export default ProjectMembersPage;