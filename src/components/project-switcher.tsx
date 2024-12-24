"use client"

import {useListProjects} from "@/features/projects/api/use-list-projects";
import {RiAddCircleFill} from "react-icons/ri";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ProjectAvatar} from "@/features/projects/components/project-avatar";
import {useRouter} from "next/navigation";
import {useProjectId} from "@/features/projects/hooks/use-project-id";
import {useCreateProjectModal} from "@/features/projects/hooks/use-create-project-modal";

export const ProjectSwitcher = () => {
    const projectId = useProjectId();
    const router = useRouter();
    const {data} = useListProjects();
    const {open} = useCreateProjectModal();

    const onSelect = (id: string) => {
        router.push(`/project/${id}`);
    };

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">Projects</p>
                <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"/>
            </div>
            <Select onValueChange={onSelect} value={projectId}>
                <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
                    <SelectValue placeholder="No project selected"/>
                </SelectTrigger>
                <SelectContent>
                    {data?.memberships.map((membership) => (
                        <SelectItem key={membership.project_id} value={membership.project_id}>
                            <div className="flex justify-start items-center gap-3 font-medium">
                                <ProjectAvatar name={membership.project_name}/>
                                <span className="truncate">{membership.project_name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}