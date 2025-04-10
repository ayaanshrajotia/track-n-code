import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownCircle, ExternalLink } from "lucide-react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import InfiniteScroll from "../InfiniteScroll";
import { ProblemContainerType } from "@/types/types";

export const ProblemContainer = ({
    id,
    expanded,
    setExpanded,
    title,
    difficulty,
    link,
    timeComplexity,
    spaceComplexity,
    platform,
    // topic,
    slug,
}: ProblemContainerType) => {
    const isOpen = id === expanded;
    return (
        <div className="w-full">
            {/* Outer div */}
            <motion.header
                initial={false}
                onClick={() => setExpanded(isOpen ? false : id)}
                className={`relative container-shadow rounded-[24px] p-4 py-5 cursor-pointer border-[1.5px] transition-all duration-300 hover:bg-tnc-gray ${
                    isOpen
                        ? "border-tnc-dark-gray border-[1.5px] bg-tnc-gray"
                        : "bg-white"
                }`}
            >
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <Link
                            className="font-semibold hover:bg-tnc-orange hover:text-white transition-all rounded-[24px] py-1 hover:px-4"
                            href={`/problems/${slug}`}
                        >
                            {title}
                        </Link>
                    </div>
                    {/* <span
                        className={`text-xs p-1 px-2 font-extrabold rounded-[8px] ${
                            difficulty === "Easy"
                                ? "bg-green-100 text-green-800"
                                : difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {difficulty}
                    </span> */}
                    <ChevronDownCircle
                        className={`cursor-pointer text-black ${
                            isOpen ? "transform rotate-180" : ""
                        } transition-all duration-300`}
                        size={18}
                    />
                </div>
            </motion.header>
            {/* Inner div */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                        className={`overflow-hidden`}
                    >
                        <div
                            className={`mt-2 rounded-[24px] bg-white border p-4 flex flex-col gap-4 ${
                                isOpen ? " border-[1.5px]" : ""
                            }`}
                        >
                            <BentoGrid className="grid-cols-4">
                                <BentoGridItem className="flex flex-col bg-tnc-black text-white">
                                    <h1 className="font-medium mb-2">
                                        Platform
                                    </h1>
                                    <span className="text-3xl font-semibold flex items-baseline gap-3">
                                        {platform}{" "}
                                        <ExternalLink
                                            className="w-5 h-5 hover:stroke-[2.5px] transition-all"
                                            href={link}
                                        />
                                    </span>
                                </BentoGridItem>
                                <BentoGridItem className="flex flex-col bg-tnc-orange text-white">
                                    <h1 className="font-medium mb-2">
                                        Difficulty
                                    </h1>
                                    <span className="text-3xl font-semibold flex items-baseline gap-3">
                                        {difficulty}{" "}
                                    </span>
                                </BentoGridItem>
                                <BentoGridItem className="flex flex-col border">
                                    <h1 className="font-medium mb-2">
                                        Time Complexity
                                    </h1>
                                    <span className="text-3xl font-semibold">
                                        {timeComplexity}
                                    </span>
                                </BentoGridItem>
                                <BentoGridItem className="flex flex-col border">
                                    <h1 className="font-medium mb-2">
                                        Space Complexity
                                    </h1>
                                    <span className="text-3xl font-semibold">
                                        {spaceComplexity}
                                    </span>
                                </BentoGridItem>
                                <BentoGridItem className="col-span-4 border flex flex-col">
                                    <h1 className="font-medium mb-3">
                                        Companies
                                    </h1>
                                    <InfiniteScroll className="w-[850px]" />
                                </BentoGridItem>
                            </BentoGrid>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

