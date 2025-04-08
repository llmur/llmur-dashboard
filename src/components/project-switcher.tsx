"use client"

import {useListMemberships} from "@/features/projects/api/use-list-memberships";
import {RiAddCircleFill} from "react-icons/ri";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ProjectAvatar} from "@/features/projects/components/project-avatar";
import {useRouter} from "next/navigation";
import {useCreateProjectModal} from "@/features/projects/hooks/use-create-project-modal";
import {useProjectId} from "@/features/projects/hooks/use-project-id";


export const ProjectSwitcher = () => {
    const router = useRouter();
    const {data} = useListMemberships();
    const {open} = useCreateProjectModal();

    const projectId = useProjectId();

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
                    {data?.map(({project}) => (
                        <SelectItem key={project.id} value={project.id}>
                            <div className="flex justify-start items-center gap-3 font-medium">
                                <ProjectAvatar name={project.name}/>
                                <span className="truncate">{project.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}