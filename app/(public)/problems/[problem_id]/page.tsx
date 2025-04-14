"use client";

import Header from "@/app/components/Header";
import {
    BentoGrid,
    BentoGridItemGlow,
} from "@/app/components/ui/bento-grid-glow";
import {
    deleteProblem,
    getSingleProblem,
} from "@/lib/features/problem/problemSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ExternalLink, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Problem() {
    const router = useRouter();
    const params = useParams();
    const problem_id = params.problem_id;
    const dispatch = useAppDispatch();

    const { problem } = useAppSelector((state) => state.problem);

    const handleDeleteProblem = async () => {
        try {
            const res = await dispatch(
                deleteProblem(problem_id as string)
            ).unwrap();
            toast.success(res.message);
            router.push("/problems");
        } catch (error) {
            console.error("Failed to delete the problem:", error);
            toast.error(
                "Failed to delete the problem. Please try again later."
            );
        }
    };

    useEffect(() => {
        dispatch(getSingleProblem(problem_id as string));
    }, [dispatch, problem_id]);

    return (
        <div>
            <Header>Problem</Header>
            <div className="flex flex-col gap-4">
                {" "}
                <Link
                    href={`/problems/${problem_id}/edit`}
                    className="bg-tnc-black text-white rounded-[28px] flex justify-between items-center px-10 py-3 cursor-pointer relative overflow-hidden group w-fit self-end"
                >
                    <span className="text-center transition-transform duration-500 uppercase text-sm font-semibold group-hover:translate-x-40">
                        Edit
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 -translate-x-40 group-hover:translate-x-0">
                        <Pencil width={20} />
                    </div>
                </Link>
                <BentoGrid className="grid-cols-12">
                    <BentoGridItemGlow className="col-span-12 bg-tnc-black text-white border border-tnc-black">
                        <h1 className="font-medium mb-2">Problem Name</h1>
                        <span className="text-3xl font-semibold leading-none">
                            {problem?.problem_title}
                        </span>
                    </BentoGridItemGlow>
                    <BentoGridItemGlow className="col-span-3 flex flex-col border">
                        <h1 className="font-medium mb-2">Platform</h1>
                        <span className="text-3xl font-semibold flex items-baseline gap-3 justify-between">
                            {problem?.platform_name}
                            <Link href={problem?.url || "#"} target="_blank">
                                <ExternalLink className="w-5 h-5 hover:stroke-[2.5px] transition-all" />
                            </Link>
                        </span>
                    </BentoGridItemGlow>
                    <BentoGridItemGlow className="col-span-3 flex flex-col border-2 border-green-600 text-green-800 bg-green-100">
                        <h1 className="font-medium mb-2">Difficulty</h1>
                        <span className="text-3xl font-semibold flex items-baseline gap-3">
                            {problem?.difficulty}
                        </span>
                    </BentoGridItemGlow>
                    <BentoGridItemGlow className="col-span-3 flex flex-col border">
                        <h1 className="font-medium mb-2">Time Complexity</h1>
                        <span className="text-3xl font-semibold">
                            O{problem?.time_complexity}
                        </span>
                    </BentoGridItemGlow>
                    <BentoGridItemGlow className="col-span-3 flex flex-col border">
                        <h1 className="font-medium mb-2">Space Complexity</h1>
                        <span className="text-3xl font-semibold">
                            O{problem?.space_complexity}
                        </span>
                    </BentoGridItemGlow>
                    <BentoGridItemGlow className="col-span-12 border flex flex-col">
                        <h1 className="font-medium mb-3">Tags</h1>
                        <div className="flex gap-3 flex-wrap">
                            {problem?.tags?.map((tag) => (
                                <span
                                    key={tag.tag_id}
                                    className="bg-tnc-black text-white p-1.5 px-4 rounded-full text-sm cursor-pointer  hover:bg-[#f46b45] transition-all"
                                >
                                    {tag.tag_name}
                                </span>
                            ))}
                        </div>
                    </BentoGridItemGlow>
                    <BentoGridItemGlow className="col-span-12 border flex flex-col">
                        <h1 className="font-medium mb-3">Notes</h1>
                        <p>{problem?.notes}</p>
                    </BentoGridItemGlow>
                    <BentoGridItemGlow className="col-span-12 border flex flex-col">
                        <h1 className="font-medium mb-3">Resources</h1>
                        <ul className="">
                            {problem?.resources?.map((resource) => (
                                <li
                                    key={resource}
                                    className="bg-white p-2 rounded-[12px] mb-2 shadow-sm border"
                                >
                                    <Link href={resource}>
                                        <span className="text-tnc-blue">
                                            {resource}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </BentoGridItemGlow>
                    <BentoGridItemGlow className="col-span-12 border flex flex-col">
                        <h1 className="font-medium mb-3">Companies</h1>
                        <div className="flex gap-3 flex-wrap">
                            {problem?.companies?.map((company) => (
                                <span
                                    key={company.company_id}
                                    className="bg-tnc-black text-white p-1.5 px-4 rounded-full text-sm cursor-pointer  hover:bg-[#f46b45] transition-all"
                                >
                                    {company.company_name}
                                </span>
                            ))}
                        </div>
                    </BentoGridItemGlow>
                </BentoGrid>
                <button
                    type="button"
                    className="bg-red-600 text-white rounded-[28px] flex justify-between items-center px-10 py-3 cursor-pointer relative overflow-hidden group w-fit self-end"
                    onClick={handleDeleteProblem}
                >
                    <span className="text-center transition-transform duration-500 uppercase text-sm font-semibold group-hover:translate-x-40">
                        Delete
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 -translate-x-40 group-hover:translate-x-0">
                        <Trash width={20} />
                    </div>
                </button>
            </div>
            <Toaster />
        </div>
    );
}
