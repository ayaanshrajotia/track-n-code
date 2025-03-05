import React from "react";
import { TypewriterEffect } from "../../components/ui/typewriter-effect";
import Link from "next/link";
import { BackgroundLines } from "@/app/components/ui/background-lines";

const words = [
    {
        text: "Keep",
    },
    {
        text: "track",
    },
    {
        text: "of",
    },
    {
        text: "problems",
    },
    {
        text: "with",
    },
    {
        text: "TracknCode.",
        className: "text-tnc-orange dark:text-blue-500",
    },
];

export default function Welcome() {
    return (
        <BackgroundLines className="public-background-gradient font-inter flex flex-col items-center justify-center h-screen w-screen">
            <TypewriterEffect
                words={words}
                className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-6xl font-sans relative z-20 font-bold tracking-tight"
            />
            {/* <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                Keep track of problems with TracknCode.
            </h1> */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-8 z-20">
                <Link
                    href={"/signup"}
                    className="w-40 h-10 rounded-[20px] bg-black border dark:border-white border-transparent text-white text-sm font-medium uppercase flex justify-center items-center"
                >
                    Join now
                </Link>
                <Link
                    href={"/login"}
                    className="w-40 h-10 rounded-[20px] bg-white text-black border-2 border-black text-sm font-medium uppercase flex justify-center items-center"
                >
                    Login
                </Link>
            </div>
        </BackgroundLines>
    );
}
