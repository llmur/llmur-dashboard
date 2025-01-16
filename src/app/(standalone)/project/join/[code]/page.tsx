import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import {getInviteInfo, listUserProjects} from "@/features/projects/queries";
import {JoinProjectForm} from "@/features/projects/components/join-project-form";

interface JoinProjectPageProps {
    params: {
        code: string;
    }
}

const JoinProjectPage = async ({params}: JoinProjectPageProps) => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in");

    let {code} = await params;

    const invite = await getInviteInfo({
        code: code
    });

    if(!invite) {
        redirect("/")
    }

    const user_projects = await listUserProjects({userId: user.id});
    if(user_projects?.memberships?.some(membership => membership.project_id === invite.project_id)) {
        redirect(`/project/${invite.project_id}`);
    }

    return (
        <div className="w-full lg:max-w-xl">
            <JoinProjectForm  name={invite.project_name}/>
        </div>

    );
};

export default JoinProjectPage;

