"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-separator";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useJoinProject} from "@/features/projects/api/use-join-project";
import {useInviteCode} from "@/features/projects/hooks/use-invite-code";
import {useRouter} from "next/navigation";

interface JoinProjectForm {
    name: string
}


export const JoinProjectForm = ({name}: JoinProjectForm) => {
    const {mutate, isPending} = useJoinProject();
    const inviteCode = useInviteCode();
    const router = useRouter();

    const onSubmit = () => {
        mutate({
            json: {
                code: inviteCode
            }
        }, {
            onSuccess: ({data}) => {
                console.log(`Success. Redirecting to ${data.project_id}`)
                router.push(`/project/${data.project_id}`)
            }
        })
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    Join Project
                </CardTitle>
                <CardDescription>
                    You&apos;ve been invited to join <strong>{name}</strong> project
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
                    <Button
                        variant="secondary"
                        type="button"
                        asChild
                        size="lg"
                        className="w-full lg:w-fit"
                        disabled={isPending}
                    >
                        <Link href="/">
                            Cancel
                        </Link>
                    </Button>
                    <Button
                        type="button"
                        size="lg"
                        className="w-full lg:w-fit"
                        onClick={onSubmit}
                        disabled={isPending}
                    >
                        Join Project
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
};