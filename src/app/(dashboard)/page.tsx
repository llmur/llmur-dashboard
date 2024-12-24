import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import {listUserProjects} from "@/features/projects/queries";

export default async function Home() {
    const user = await getCurrent();
    if(!user) redirect("/sign-in");

    const projects = await listUserProjects({userId: user.id});
    if(projects?.total === 0) {
        redirect("/project/create");
    }
    else {
        redirect(`/project/${projects.memberships[0].project_id}`);
    }
}