import Header from "@/app/components/Header";
import InfiniteScroll from "@/app/components/InfiniteScroll";
import { BentoGrid, BentoGridItem } from "@/app/components/ui/bento-grid";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

const problem = {
    user_id: "65fd3b9c8e1b2a001f8e4a23",
    problem_title: "Two Sum",
    platform_name: "LeetCode",
    time_complexity: "O(n)",
    space_complexity: "O(n)",
    resources: [
        "https://leetcode.com/problems/two-sum/",
        "https://www.geeksforgeeks.org/two-sum-problem/",
    ],
    notes: "Used a hashmap to store indices, reducing lookup time. Alternative approach: Two-pointer method if sorted.",
    url: "https://leetcode.com/problems/two-sum/",
    is_rev: false,
    difficulty: "Easy",
    problem_tags: ["65fd3b9c8e1b2a001f8e4a30", "65fd3b9c8e1b2a001f8e4a31"],
    is_solved: true,
    tag_ids: ["array", "hashmap"],
};

export default function Problem() {
    return (
        <div>
            <Header>Problem</Header>
            <div>
                <BentoGrid className="grid-cols-12">
                    <BentoGridItem className="col-span-12 bg-tnc-black text-white">
                        <h1 className="font-medium mb-2">Problem Name</h1>
                        <span className="text-3xl font-semibold leading-none">
                            {problem.problem_title}
                        </span>
                    </BentoGridItem>
                    <BentoGridItem className="col-span-3 flex flex-col bg-tnc-black text-white">
                        <h1 className="font-medium mb-2">Platform</h1>
                        <span className="text-3xl font-semibold flex items-baseline gap-3 justify-between">
                            {problem.platform_name}{" "}
                            <Link href={problem.url} target="_blank">
                                <ExternalLink className="w-5 h-5 hover:stroke-[2.5px] transition-all" />
                            </Link>
                        </span>
                    </BentoGridItem>
                    <BentoGridItem className="col-span-3 flex flex-col bg-lime-600 text-white">
                        <h1 className="font-medium mb-2">Difficulty</h1>
                        <span className="text-3xl font-semibold flex items-baseline gap-3">
                            {problem.difficulty}{" "}
                        </span>
                    </BentoGridItem>
                    <BentoGridItem className="col-span-3 flex flex-col border">
                        <h1 className="font-medium mb-2">Time Complexity</h1>
                        <span className="text-3xl font-semibold">
                            {problem.time_complexity}
                        </span>
                    </BentoGridItem>
                    <BentoGridItem className="col-span-3 flex flex-col border">
                        <h1 className="font-medium mb-2">Space Complexity</h1>
                        <span className="text-3xl font-semibold">
                            {problem.space_complexity}
                        </span>
                    </BentoGridItem>
                    <BentoGridItem className="col-span-12 border flex flex-col">
                        <h1 className="font-medium mb-3">Tags</h1>
                        <ul className="list-disc list-inside">
                            {problem.tag_ids.map((tag) => (
                                <li key={tag}>{tag}</li>
                            ))}
                        </ul>
                    </BentoGridItem>
                    <BentoGridItem className="col-span-12 border flex flex-col">
                        <h1 className="font-medium mb-3">Notes</h1>
                        <p>{problem.notes}</p>
                    </BentoGridItem>
                    <BentoGridItem className="col-span-12 border flex flex-col">
                        <h1 className="font-medium mb-3">Resources</h1>
                        <ul className="list-disc list-inside">
                            {problem.resources.map((resource) => (
                                <li key={resource}>
                                    <Link href={resource}>
                                        <span className="text-tnc-blue">
                                            {resource}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </BentoGridItem>
                    <BentoGridItem className="col-span-12 border flex flex-col">
                        <h1 className="font-medium mb-3">Companies</h1>
                        <InfiniteScroll className="w-[850px]" />
                    </BentoGridItem>
                </BentoGrid>
            </div>
        </div>
    );
}
