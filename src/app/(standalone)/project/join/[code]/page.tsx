import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import {getInviteInfo} from "@/features/projects/queries";

interface JoinProjectPageProps {
    params: {
        code: string;
    }
}

const JoinProjectPage = async ({params}: JoinProjectPageProps) => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in");

    let {code} = await params;

    const invite = await getInviteInfo({
        code: code
    });

    return (
        <div>{JSON.stringify(invite)}</div>
    );
};

export default JoinProjectPage;