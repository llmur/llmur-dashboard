"use client";

import {GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill} from "react-icons/go";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

import {useProjectId} from "@/features/projects/hooks/use-project-id";
import {SettingsIcon} from "lucide-react";

const routes = [
    {
        label: 'Home',
        href: '',
        icon: GoHome,
        activeIcon: GoHomeFill
    },
    {
        label: 'Members',
        href: '/members',
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill
    },
    {
        label: 'Settings',
        href: '/settings',
        icon: SettingsIcon,
        activeIcon: SettingsIcon
    },
];

export const Navigation = () => {
    const projectId = useProjectId();
    const pathname = usePathname();

    return (
        <ul className="flex flex-col">
            {routes.map((item) => {
                const fullHref = `/project/${projectId}${item.href}`;
                const isActive = pathname === fullHref;
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