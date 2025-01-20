import {useParams} from "next/navigation";

export const useDeploymentId = () => {
    const params = useParams();
    return params.deploymentId as string;
}