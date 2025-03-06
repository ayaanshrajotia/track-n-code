import { InventoryType } from "@/types/types";
import React from "react";
import { BentoGridItem } from "../ui/bento-grid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlowingEffect } from "../ui/glowing-effect";

export default function InventoryContainer({
    title,
    description,
    // problemCount,
    slug,
    createdAt,
}: InventoryType) {
    return (
        <BentoGridItem className="flex flex-col border transition-all bg-white hover:bg-tnc-gray cursor-pointer">
            <GlowingEffect
                borderWidth={1.5}
                spread={64}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
            />
            <span className="text-sm opacity-70 mb-2">{createdAt}</span>
            <div className="flex flex-col">
                <h1 className="font-semibold text-2xl">{title}</h1>
                <p className="text-sm opacity-70">{description}</p>
            </div>
            <div className="w-full h-[1px] bg-black opacity-10 my-4"></div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col ">
                    <span className="text-xs opacity-70 uppercase">
                        Problems
                    </span>
                    <span className="text-4xl font-medium">
                        {Math.floor(Math.random() * 100)}
                    </span>
                </div>
                <Link
                    href={`/inventory/${slug}`}
                    className="bg-tnc-black text-white p-1.5 rounded-[12px] self-end"
                >
                    <ArrowRight className="" width={20} height={20} />
                </Link>
            </div>
        </BentoGridItem>
    );
}
