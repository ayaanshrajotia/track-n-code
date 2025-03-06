"use client"

import { FilterOption } from "@/app/components/FilterOption";
import Header from "@/app/components/Header";
import { ProblemContainer } from "@/app/components/containers/ProblemContainer";
import { SortOption } from "@/app/components/SortOption";
import { problems } from "@/libs/utils";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

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
    const [expanded, setExpanded] = useState<number | boolean>(-1);
    const [isFilterOpen, setIsFilterOpen] = useState<number | boolean>(0);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(e.target.value);
    // };
    // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log("submitted");
    // };

    return (
        <div>
            <Header>Sorting Algorithms</Header>
            <div className="flex flex-col gap-6">
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
                    <div className="bg-tnc-orange text-white rounded-[24px] flex justify-between items-center px-5 py-3 cursor-pointer relative overflow-hidden group">
                        <span className="text-center transition-transform duration-500 uppercase text-sm font-semibold group-hover:translate-x-40">
                            Add Problem
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 -translate-x-40 group-hover:translate-x-0 text-lg">
                            📒
                        </div>
                    </div>
                </div>
                <div className="flex gap-6 justify-between">
                    <div className="w-[calc(100%-300px)] flex flex-col gap-3">
                        {problems.map((problem) => (
                            <ProblemContainer
                                key={problem.id}
                                id={problem.id}
                                expanded={expanded}
                                setExpanded={setExpanded}
                                title={problem.title}
                                difficulty={problem.difficulty}
                                link={problem.link}
                                companies={problem.companies}
                                timeComplexity={problem.timeComplexity}
                                spaceComplexity={problem.spaceComplexity}
                                platform={problem.platform}
                                topic={problem.topic}
                                slug={problem.slug}
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
