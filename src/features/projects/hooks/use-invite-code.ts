import {useParams} from "next/navigation";

export const useInviteCode = () => {
    const params = useParams();
    console.log(`Getting Invite code from params. Got ${params.code}`)
    return params.code as string;
}