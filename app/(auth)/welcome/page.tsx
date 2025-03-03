import React from "react";
import { TypewriterEffect } from "../../components/ui/typewriter-effect";

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
        className: "text-blue-500 dark:text-blue-500",
    },
];

export default function Welcome() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <div className="bg-tnc-gray h-[94vh] w-[96vw] rounded-[28px] flex flex-col items-center border justify-center">
                <TypewriterEffect words={words} />
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-8">
                    <button className="w-40 h-10 rounded-[20px] bg-black border dark:border-white border-transparent text-white text-sm font-medium uppercase">
                        Join now
                    </button>
                    <button className="w-40 h-10 rounded-[20px] bg-transparent text-black border-2 border-black text-sm font-medium uppercase">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
