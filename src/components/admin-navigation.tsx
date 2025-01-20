"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {PiUser, PiUserFill} from "react-icons/pi";
import {AiFillApi, AiOutlineApi} from "react-icons/ai";
import {TbSettings, TbSettingsFilled} from "react-icons/tb";

export const AdminNavigation = () => {
    const pathname = usePathname();

    const routes = [
        {
            label: 'Users',
            href: '/users',
            activeIcon: PiUser,
            icon: PiUserFill
        },
        {
            label: 'Connections',
            href: '/connections',
            activeIcon: AiOutlineApi,
            icon: AiFillApi
        },
        {
            label: 'Settings',
            href: '/settings',
            activeIcon: TbSettings,
            icon: TbSettingsFilled
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

