import Link from "next/link";
import Image from "next/image";
import {DottedSeparator} from "@/components/dotted-separator";
import {Navigation} from "@/components/navigation";
import {ProjectSwitcher} from "@/components/project-switcher";
import {AdminNavigation} from "@/components/admin-navigation";

export const Sidebar = () => {
    return (
        <aside className="h-full bg-neutral-100 p-6 w-full">
            <Link href="/" className="flex items-center">
                <Image src="/logo.svg" alt="logo" width={55} height={55}/>
                <span className="pl-4 text-3xl font-bold text-neutral-800">LLMur</span>
            </Link>

            <DottedSeparator className="my-4"/>

            <ProjectSwitcher />

            <DottedSeparator className="my-4"/>

            <Navigation />

            <DottedSeparator className="my-4"/>

            <AdminNavigation />
        </aside>
    )
};