"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

const DeploymentRedirect = () => {
    const projectId = useProjectId();
    const router = useRouter();

    useEffect(() => {
        if (projectId) {
            router.replace(`/project/${projectId}/deployments`);
        }
    }, [projectId, router]);

    return null;
};

export default DeploymentRedirect;