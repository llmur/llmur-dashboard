import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import {EditProjectForm} from "@/features/projects/components/edit-project-form";
import {getProject} from "@/features/projects/queries";

interface ProjectIdSettingsPageProps {
    projectId: string;
};

const ProjectIdSettingsPage = async ({
                                         params
                                     }: Readonly<{
    params: Promise<ProjectIdSettingsPageProps>;
}>) => {

    const {projectId} = await params;

    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    const initialValues = await getProject({projectId});

    if (!initialValues) {
        redirect(`/project/${projectId}`);
    }

    return (
        <div className="w-full lg:max-w-xl">
            <EditProjectForm initialValues={initialValues}/>
        </div>
    );
};

export default ProjectIdSettingsPage;