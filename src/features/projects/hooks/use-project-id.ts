import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {LAST_PROJECT_USED_KEY} from "@/features/auth/constants";

export const useProjectId = () => {
    const params = useParams();
    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        if (params.projectId) {
            const pid = params.projectId as string;
            try {
                window.localStorage.setItem(LAST_PROJECT_USED_KEY, pid);
                setProjectId(pid);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const value = window.localStorage.getItem(LAST_PROJECT_USED_KEY);
                setProjectId(value ? value : "");
            } catch (error) {
                console.log(error);
            }
        }
    }, [params.projectId]);

    return projectId;
};