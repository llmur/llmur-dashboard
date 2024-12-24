import type {Metadata} from "next";
import {Inter} from "next/font/google"

import {cn} from "@/lib/utils";
import {QueryProvider} from "@/components/query-provider";
import {Toaster} from "@/components/ui/sonner";

import {NuqsAdapter} from 'nuqs/adapters/next/app';

import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "LLMur Dashboard",
    description: "LLMur Dashboard",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={cn(inter.className, "antialiased min-h-screen")}
        >
        <NuqsAdapter>
            <QueryProvider>
                <Toaster/>
                {children}
            </QueryProvider>
        </NuqsAdapter>
        </body>
        </html>
    );
}
