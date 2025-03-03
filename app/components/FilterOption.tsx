import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownCircle } from "lucide-react";

export const FilterOption = ({
    id,
    expanded,
    setExpanded,
    title,
    options,
}: {
    id: number;
    expanded: number | boolean;
    setExpanded: React.Dispatch<React.SetStateAction<number | boolean>>;
    title: string;
    options: string[];
}) => {
    const isOpen = id === expanded;
    return (
        <div className="w-full">
            <motion.header
                initial={false}
                onClick={() => setExpanded(isOpen ? false : id)}
                className="cursor-pointer bg-transparent"
            >
                <div className="flex items-center gap-4 justify-between">
                    {title}
                    <ChevronDownCircle
                        className={`cursor-pointer text-tnc-black ${
                            isOpen ? "transform rotate-180" : ""
                        } transition-all duration-300`}
                        size={18}
                    />
                </div>
            </motion.header>
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
                        className="overflow-hidden"
                    >
                        <div className="mt-2 rounded-[20px] flex flex-wrap pt-1.5">
                            {options.map((option, idx) => (
                                <div
                                    key={idx}
                                    className="bg-tnc-black text-white p-1.5 px-3.5 rounded-full text-xs cursor-pointer mr-1.5 mb-2"
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};
