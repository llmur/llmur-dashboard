"use client";

import {GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill} from "react-icons/go";
import {SettingsIcon} from "lucide-react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {PiUser, PiUserFill} from "react-icons/pi";

export const AdminNavigation = () => {
    const pathname = usePathname();

    const routes = [
        {
            label: 'Users',
            href: '/users',
            icon: PiUser,
            activeIcon: PiUserFill
        },
        {
            label: 'Connections',
            href: '/connections',
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

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">Admin</p>
            </div>
            <ul className="flex flex-col">
                {routes.map((item) => {
                    const fullHref = `/admin${item.href}`;
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
        </div>
    )
};

