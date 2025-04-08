import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import {getCurrentUserMembershipsAction} from "@/features/projects/server/actions";

export default async function Home() {
    const user = await getCurrent();
    if(!user) redirect("/sign-in");

    //const projects = await listUserProjects({userId: user.id});
    const projects = await getCurrentUserMembershipsAction();
    if(!projects.data || projects.data.total === 0) {
        redirect("/project/create");
    }
    else {
        redirect(`/project/${projects.data.memberships[0].project_id}`);
    }
}