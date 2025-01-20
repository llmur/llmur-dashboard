"use client";

import {GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill} from "react-icons/go";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

import {TbSettings, TbSettingsFilled} from "react-icons/tb";
import {useProjectId} from "@/features/projects/hooks/use-project-id";
import {HiKey, HiOutlineKey, HiRocketLaunch, HiOutlineRocketLaunch} from "react-icons/hi2";

type Route = {
    label: string;
    href: string;
    activeIf: {
        startsWith: string[];
        equals: string[];
    };
    activeIcon: React.ComponentType<{ className?: string }>;
    icon: React.ComponentType<{ className?: string }>;
};

const routes: Route[] = [
    {
        label: 'Home',
        href: '',
        activeIf: {
            startsWith: [],
            equals: ['']
        },
        activeIcon: GoHome,
        icon: GoHomeFill
    },
    {
        label: 'Deployments',
        href: '/deployments',
        activeIf: {
            startsWith: ['/deployment'],
            equals: []
        },
        activeIcon: HiOutlineRocketLaunch,
        icon: HiRocketLaunch
    },
    {
        label: 'Virtual Keys',
        href: '/key',
        activeIf: {
            startsWith: ['/key'],
            equals: []
        },
        activeIcon: HiOutlineKey,
        icon: HiKey
    },
    {
        label: 'Members',
        href: '/members',
        activeIf: {
            startsWith: [],
            equals: ['/members']
        },
        activeIcon: GoCheckCircle,
        icon: GoCheckCircleFill
    },
    {
        label: 'Settings',
        href: '/settings',
        activeIf: {
            startsWith: [],
            equals: ['/settings']
        },
        activeIcon: TbSettings,
        icon: TbSettingsFilled
    },
];

export const Navigation = () => {
    const pathname = usePathname();
    const projectId = useProjectId();

    return (
        <ul className="flex flex-col">
            {routes.map((item) => {
                const fullHref = `/project/${projectId}${item.href}`;
                const isActive: boolean =
                    item.activeIf.startsWith.some(prefix => pathname.startsWith(`/project/${projectId}${prefix}`)) ||
                    item.activeIf.equals.includes(pathname.replace(`/project/${projectId}`, ""));

                const Icon = isActive ? item.icon : item.activeIcon;

                return (
                    <Link key={item.href} href={fullHref}>
                        <div className={cn(
                            "flex items-center gap-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500 p-2",
                            isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                        )}>
                            <Icon className="size-5 text-neutral-500"/>
                            {item.label}
                        </div>
                    </Link>
                )
            })}
        </ul>
    );
}