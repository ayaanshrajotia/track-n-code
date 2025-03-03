"use client";
import React, { useEffect, useState } from "react";
import {
    ChartNoAxesColumnIncreasing,
    House,
    LogOut,
    NotebookPen,
} from "lucide-react";
import { SlideTabs } from "../components/Navbar";

const navItems = [
    {
        title: "Inventory",
        icon: <NotebookPen className="h-full w-full dark:text-neutral-300" />,
        href: "/inventory",
    },
    {
        title: "Dashboard",
        icon: <House className="h-full w-full dark:text-neutral-300" />,
        href: "/dashboard",
    },
    {
        title: "Leaderboard",
        icon: (
            <ChartNoAxesColumnIncreasing
                className="h-full w-full dark:text-neutral-300"
                strokeWidth={3}
            />
        ),
        href: "/leaderboard",
    },
    {
        title: "Logout",
        href: "/logout",
        icon: <LogOut className="h-full w-full dark:text-neutral-300" />,
    },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            console.log(window.scrollY);
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    console.log("scrolled", scrolled);

    return (
        <main className="public-background-gradient">
            <div className="relative min-h-screen max-w-screen-xl mx-auto px-4 py-5">
                <div
                    className={`absolute left-1/2 -translate-x-1/2 flex items-center justify-center transition-transform duration-500 `}
                >
                    <SlideTabs navLinks={navItems} />
                </div>
                {children}
            </div>
        </main>
    );
}

// ${
//     scrolled
//         ? "-translate-y-[112px] -bottom-[100px]"
//         : "-top-[100px] translate-y-[112px]"
// }
