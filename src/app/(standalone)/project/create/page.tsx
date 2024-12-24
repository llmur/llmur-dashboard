import {CreateProjectForm} from "@/features/projects/components/create-project-form";
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";

const ProjectCreatePage = async () => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in");

    return (
        <div className="w-full lg:max-w-xl">
            <CreateProjectForm />
        </div>
    );
};

export default ProjectCreatePage;