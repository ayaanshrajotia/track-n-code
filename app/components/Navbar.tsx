"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signOut } from "next-auth/react";

export function SlideTabs({
    navLinks,
}: {
    navLinks: { title: string; icon: React.ReactNode; href: string }[];
}) {
    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    const handleLogout = async () => {
        const res = await signOut({ redirect: true, callbackUrl: "/" });
        console.log(res);
    };
    return (
        <ul
            onMouseLeave={() => {
                setPosition((pv) => ({
                    ...pv,
                    opacity: 0,
                }));
            }}
            className="relative mx-auto flex w-fit rounded-full bg-tnc-gray p-2"
        >
            {navLinks.slice(0, 3).map((navLink, index) => (
                <Link href={navLink.href} key={index}>
                    <Tab setPosition={setPosition}>{navLink.title}</Tab>
                </Link>
            ))}
            {
                <Tab
                    setPosition={setPosition}
                    key="logout"
                    onClick={handleLogout}
                >
                    Logout
                </Tab>
            }

            <Cursor position={position} />
        </ul>
    );
}

function Tab({
    children,
    setPosition,
    onClick,
}: {
    children: React.ReactNode;
    setPosition: React.Dispatch<
        React.SetStateAction<{ left: number; width: number; opacity: number }>
    >;
    onClick?: () => void;
}) {
    const ref = useRef(null);

    return (
        <li
            ref={ref}
            onMouseEnter={() => {
                if (!ref?.current) return;

                const { width } = (
                    ref.current as HTMLLIElement
                ).getBoundingClientRect();

                setPosition({
                    left: (ref.current as HTMLLIElement).offsetLeft,
                    width,
                    opacity: 1,
                });
            }}
            className="relative z-10 block cursor-pointer px-4 py-2 text-xs uppercase text-white mix-blend-difference font-medium"
            onClick={onClick}
        >
            {children}
        </li>
    );
}

function Cursor({
    position,
}: {
    position: { left: number; width: number; opacity: number };
}) {
    return (
        <motion.li
            animate={{
                ...position,
            }}
            className={`absolute z-0 h-8 rounded-full bg-tnc-black`}
        />
    );
}
