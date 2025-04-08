import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import {EditProjectForm} from "@/features/projects/components/edit-project-form";
import {getProjectAction} from "@/features/projects/server/actions";

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

    const initialValues = await getProjectAction(projectId);

    if (!initialValues.data) {
        redirect(`/project/${projectId}`);
    }

    return (
        <div className="h-full flex flex-col space-y-4">
            <EditProjectForm initialValues={initialValues.data}/>
        </div>
    );
};

export default ProjectIdSettingsPage;