"use client";

import { ProblemContainer } from "@/app/components/containers/ProblemContainer";
import { FilterOption } from "@/app/components/FilterOption";
import Header from "@/app/components/Header";
import { SortOption } from "@/app/components/SortOption";
import { getAllProblems } from "@/lib/features/problem/problemSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const filters = [
    {
        id: 10,
        title: "Difficulty",
        options: ["Easy", "Medium", "Hard"],
    },
    {
        id: 20,
        title: "Company",
        options: ["Amazon", "Google", "Facebook", "Microsoft"],
    },
    {
        id: 3,
        title: "Platform",
        options: ["LeetCode", "GeeksForGeeks", "HackerRank"],
    },
    {
        id: 4,
        title: "Topic",
        options: [
            "Array",
            "Hash Table",
            "Linked List",
            "Math",
            "Two Pointers",
            "String",
            "Backtracking",
            "Stack",
        ],
    },
];
const sortOptions = [
    { id: 1, title: "Newest First" },
    { id: 2, title: "Oldest First" },
    { id: 3, title: "Most Difficult First" },
    { id: 4, title: "Least Difficult First" },
    { id: 5, title: "Most Companies First" },
    { id: 6, title: "Least Companies First" },
    { id: 7, title: "Most Platforms First" },
    { id: 8, title: "Least Platforms First" },
    { id: 9, title: "Most Topics First" },
    { id: 10, title: "Least Topics First" },
];

export default function Problems() {
    const dispatch = useAppDispatch();

    const { allProblems } = useAppSelector((state) => state.problem);

    const [expanded, setExpanded] = useState<number | boolean>(-1);
    const [isFilterOpen, setIsFilterOpen] = useState<number | boolean>(0);

    useEffect(() => {
        dispatch(getAllProblems());
    }, [dispatch]);

    console.log(allProblems);

    return (
        <div>
            <Header>Problems</Header>
            <div className="flex flex-col gap-4">
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
                <div className="flex gap-6 justify-between">
                    <div className="w-[calc(100%-300px)] flex flex-col gap-3">
                        {allProblems?.map((problem, idx) => (
                            <ProblemContainer
                                key={problem.problem_id}
                                problem_id={problem.problem_id}
                                platform_name={problem.platform_name}
                                expanded={expanded}
                                setExpanded={setExpanded}
                                problem_name={problem.problem_title}
                                difficulty={problem.difficulty}
                                url={problem.url}
                                companies={problem.companies}
                                time_complexity={problem.time_complexity}
                                space_complexity={problem.space_complexity}
                                resources={problem.resources}
                                tags={problem.tags}
                                inventories={problem.inventories}
                                is_revision={problem.is_revision}
                                notes={problem.notes}
                                idx={idx}
                            />
                        ))}
                    </div>
                    <div className="max-w-[300px] w-full flex flex-col gap-4">
                        <div
                            className={
                                "flex flex-col gap-4 bg-tnc-gray  p-4 px-5 rounded-[24px] border"
                            }
                        >
                            <h1 className="font-bold text-lg uppercase">
                                Filters
                            </h1>
                            <div className="flex flex-col gap-6">
                                {filters.map((filter) => (
                                    <FilterOption
                                        key={filter.id}
                                        id={filter.id}
                                        expanded={isFilterOpen}
                                        setExpanded={setIsFilterOpen}
                                        title={filter.title}
                                        options={filter.options}
                                    />
                                ))}
                            </div>
                        </div>
                        <div
                            className={
                                "flex flex-col gap-4 bg-tnc-gray  p-4 px-5 rounded-[24px] border"
                            }
                        >
                            <h1 className="font-bold text-lg">Sort By</h1>
                            <div className="flex flex-col">
                                {sortOptions.map((option) => (
                                    <SortOption
                                        key={option.id}
                                        title={option.title}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
