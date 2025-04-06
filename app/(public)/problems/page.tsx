import Header from "@/app/components/Header";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Problems() {
    return (
        <div>
            <Header>Problems</Header>
            <div>
                <div className="flex justify-between items-center">
                    <div className="bg-white border-[1.5px] hover:border-tnc-dark-gray p-5 py-3 rounded-[24px] flex gap-4 w-[350px] focus-within:border-tnc-dark-gray transition-all">
                        <input
                            type="text"
                            placeholder="Search for problems"
                            className="bg-transparent outline-none w-full placeholder:text-stone-400"
                        />
                        <SearchIcon
                            className="text-tnc-dark-gray"
                            strokeWidth={2}
                            width={28}
                        />
                    </div>
                    <Link
                        href={"/problems/add-problem"}
                        className="bg-tnc-orange text-white rounded-[24px] flex justify-between items-center px-5 py-3 cursor-pointer relative overflow-hidden group"
                    >
                        <span className="text-center transition-transform duration-500 uppercase text-sm font-semibold group-hover:translate-x-40">
                            Add Problem
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 -translate-x-40 group-hover:translate-x-0 text-lg">
                            📒
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
