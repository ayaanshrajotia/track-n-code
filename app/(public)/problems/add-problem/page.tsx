"use client";

import Header from "@/app/components/Header";
import { BentoGrid, BentoGridItem } from "@/app/components/ui/bento-grid";
import { ChevronDownCircle, Plus, SearchIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import Linkify from "linkify-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addProblem, getAllTCI } from "@/lib/features/problem/problemSlice";
import { CompanyType, InventoryType, TagType } from "@/types/types";
import toast, { Toaster } from "react-hot-toast";

const platforms = [
    "Codeforces",
    "Leetcode",
    "Atcoder",
    "Codechef",
    "GeeksforGeeks",
];

const difficulty = ["Easy", "Medium", "Hard"];

export default function AddProblemPage() {
    const dispatch = useAppDispatch();

    const {
        companiesFromServer,
        tagsFromServer,
        inventoriesFromServer,
        companiesNameToId,
        addLoading,
    } = useAppSelector((state) => state.problem);

    const [problemDetails, setProblemDetails] = useState({
        problem_title: "",
        platform_name: "Leetcode",
        url: "",
        difficulty: "Easy",
        notes: "",
        tags: [] as TagType[],
        inventories: [] as string[],
        resources: [] as string[],
        company_tags: [] as string[],
        time_complexity: "",
        space_complexity: "",
        is_revision: false,
    });

    // Expanded states for dropdowns
    const [platformExpanded, setPlatformExpanded] = useState(false);
    const [difficultyExpanded, setDifficultyExpanded] = useState(false);

    // State for inventory input
    const [searchInventory, setSearchInventory] = useState("");
    const [filteredInventories, setFilteredInventories] = useState<
        InventoryType[]
    >([]);

    // State for search input
    const [searchTag, setSearchTag] = useState("");
    const [filteredTags, setFilteredTags] = useState<TagType[]>([]);

    // State for company input
    const [searchCompany, setSearchCompany] = useState("");
    const [filteredCompanies, setFilteredCompanies] = useState<CompanyType[]>(
        []
    );

    // State for resource input
    const [resourceInput, setResourceInput] = useState("");

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchTag(query);

        if (query.length > 0) {
            const matchingTags = tagsFromServer.filter((tag) =>
                tag.tag_name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredTags(matchingTags);

            if (
                matchingTags.length === 0 &&
                !tagsFromServer.some((tag) => tag.tag_name === query)
            ) {
                setFilteredTags([{ tag_name: query, tag_type: "atomic" }]); // Allow adding a new tag
            }
        } else {
            setFilteredTags([]);
        }
    };

    const handleTagSelect = (tag: TagType) => {
        if (!problemDetails.tags.find((t) => t.tag_name === tag.tag_name)) {
            setProblemDetails((prev) => ({
                ...prev,
                tags: [...prev.tags, tag],
            }));
        }

        setFilteredTags([]);
        setSearchTag("");
    };

    const handleRemoveTag = (tag: string) => {
        setProblemDetails((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t.tag_name !== tag),
        }));
        setSearchTag("");
        setFilteredTags([]);
    };

    const handletagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchTag.trim() !== "") {
            handleTagSelect({ tag_name: searchTag.trim(), tag_type: "atomic" });
            e.preventDefault(); // Prevent form submission
        }
    };

    const handleAddInventoryInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const query = e.target.value;
        setSearchInventory(query);

        if (query.length > 0) {
            const matchingInventory = inventoriesFromServer.filter(
                (inventory) =>
                    inventory.inventory_name
                        .toLowerCase()
                        .includes(query.toLowerCase())
            );

            setFilteredInventories(matchingInventory);

            if (
                matchingInventory.length === 0 &&
                !inventoriesFromServer.some(
                    (inventory) => inventory.inventory_name === query
                )
            ) {
                setFilteredInventories([{ inventory_name: query }]); // Allow adding a new inventory
            }
        } else {
            setFilteredInventories([]);
        }
    };

    const handleAddInventorySelect = (inventory: string) => {
        if (!problemDetails.inventories.find((i) => i === inventory)) {
            setProblemDetails((prev) => ({
                ...prev,
                inventories: [...prev.inventories, inventory],
            }));
        }
        setFilteredInventories([]);
        setSearchInventory("");
    };

    const handleAddInventoryRemove = (inventory: string) => {
        setProblemDetails((prev) => ({
            ...prev,
            inventories: prev.inventories.filter((i) => i !== inventory),
        }));
        setSearchInventory("");
        setFilteredInventories([]);
    };

    const handleCompanyInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const query = e.target.value;
        setSearchCompany(query);

        if (query.length > 0) {
            const matchingCompanies = companiesFromServer.filter((company) =>
                company.company_tag_name
                    .toLowerCase()
                    .includes(query.toLowerCase())
            );
            setFilteredCompanies(matchingCompanies);
        } else {
            setFilteredCompanies([]);
        }
    };

    const handleCompanySelect = (company: CompanyType) => {
        if (!problemDetails.company_tags.find((c) => c === company._id)) {
            setProblemDetails((prev) => ({
                ...prev,
                company_tags: [...prev.company_tags, company._id],
            }));
        }
        setFilteredCompanies([]);
        setSearchCompany("");
    };

    const handleCompanyRemove = (company: string) => {
        setProblemDetails((prev) => ({
            ...prev,
            company_tags: prev.company_tags.filter((c) => c !== company),
        }));
        setSearchCompany("");
        setFilteredCompanies([]);
    };

    // const handleCompanyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Enter" && searchCompany.trim() !== "") {
    //         handleCompanySelect(searchCompany.trim());
    //         e.preventDefault(); // Prevent form submission
    //     }
    // };

    const handleAddResource = () => {
        if (
            resourceInput.trim() !== "" &&
            !problemDetails.resources.includes(resourceInput.trim())
        ) {
            setProblemDetails((prev) => ({
                ...prev,
                resources: [...prev.resources, resourceInput.trim()],
            }));
            setResourceInput("");
        }
    };

    const removeResource = (resource: string) => {
        setProblemDetails((prev) => ({
            ...prev,
            resources: prev.resources.filter((r) => r !== resource),
        }));
        setResourceInput("");
    };

    const handleResourceKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            handleAddResource();
            e.preventDefault();
        }
    };

    const handleSubmit = async () => {
        try {
            const res = await dispatch(addProblem(problemDetails)).unwrap();
            toast.success(res.message); // show success message from backend
        } catch (error) {
            toast.error(
                (typeof error === "string" && error) || "Something went wrong"
            ); // show error from backend
        }
    };

    useEffect(() => {
        dispatch(getAllTCI());
    }, [dispatch]);

    return (
        <div>
            {/* Header Section */}
            <Header>Problem</Header>
            <div className="flex flex-col gap-4">
                <button
                    className={`text-white rounded-[24px] flex justify-between items-center px-4 py-3 cursor-pointer relative overflow-hidden group w-fit self-end transition-all ${
                        problemDetails.is_revision
                            ? "bg-tnc-orange"
                            : "bg-tnc-black"
                    }`}
                    onClick={() =>
                        setProblemDetails((prev) => ({
                            ...prev,
                            is_revision: !prev.is_revision,
                        }))
                    }
                >
                    <span className="text-xs uppercase font-semibold">
                        {problemDetails.is_revision
                            ? "Marked as Revision"
                            : "Mark as Revision"}
                    </span>
                </button>
                <BentoGrid className="grid-cols-12 gap-5">
                    {/* Problem Name Input */}
                    <BentoGridItem className="col-span-6 flex flex-col justify-between bg-tnc-black text-white">
                        <h1 className="text-sm text-neutral-200 font-medium">
                            Problem Name
                        </h1>
                        <input
                            type="text"
                            placeholder="enter-problem-name"
                            className="bg-transparent w-full text-white text-lg font-medium outline-none placeholder:font-normal"
                            value={problemDetails.problem_title}
                            onChange={(e) =>
                                setProblemDetails({
                                    ...problemDetails,
                                    problem_title: e.target.value,
                                })
                            }
                        />
                    </BentoGridItem>

                    {/* Problem URL Input */}
                    <BentoGridItem className="col-span-6 flex flex-col gap-3 justify-between border">
                        <h1 className="text-sm font-medium">Problem Link</h1>
                        <input
                            type="text"
                            placeholder="enter-problem-link"
                            value={problemDetails.url}
                            onChange={(e) =>
                                setProblemDetails({
                                    ...problemDetails,
                                    url: e.target.value,
                                })
                            }
                            className="w-full text-lg bg-transparent font-medium outline-none placeholder:font-normal"
                        />
                    </BentoGridItem>

                    {/* Platform Dropdown */}
                    <BentoGridItem className="col-span-6 flex flex-col gap-2.5 bg-tnc-gray border">
                        <h1 className="font-medium text-sm">Platform</h1>
                        <div className="w-full">
                            {/* Dropdown Header */}
                            <motion.header
                                initial={false}
                                onClick={() => {
                                    setPlatformExpanded((prev) => !prev);
                                    setDifficultyExpanded(false);
                                }}
                                className={``}
                            >
                                <div className="flex items-center gap-4 cursor-pointer">
                                    <span className="flex-1 font-semibold text-xl">
                                        {problemDetails.platform_name}
                                    </span>
                                    <ChevronDownCircle
                                        className={`cursor-pointer ${
                                            platformExpanded
                                                ? "transform rotate-180"
                                                : ""
                                        } transition-all duration-300`}
                                        size={18}
                                    />
                                </div>
                            </motion.header>
                            {/* Dropdown Content */}
                            <AnimatePresence initial={false}>
                                {platformExpanded && (
                                    <motion.section
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{
                                            open: {
                                                opacity: 1,
                                                height: "auto",
                                            },
                                            collapsed: {
                                                opacity: 0,
                                                height: 0,
                                            },
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.04, 0.62, 0.23, 0.98],
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <ul className="">
                                            {platforms
                                                .filter(
                                                    (p) =>
                                                        p !==
                                                        problemDetails.platform_name
                                                )
                                                .map((p) => (
                                                    <li
                                                        key={p}
                                                        onClick={() => {
                                                            setProblemDetails({
                                                                ...problemDetails,
                                                                platform_name:
                                                                    p,
                                                            });
                                                            setPlatformExpanded(
                                                                false
                                                            );
                                                        }}
                                                        className="cursor-pointer text-base text-stone-700 w-fit hover:bg-tnc-orange hover:text-white hover:font-medium hover:px-2 py-0.5 transition-all rounded-[8px]"
                                                    >
                                                        {p}
                                                    </li>
                                                ))}
                                        </ul>
                                    </motion.section>
                                )}
                            </AnimatePresence>
                        </div>
                    </BentoGridItem>

                    {/* Difficulty Dropdown */}
                    <BentoGridItem className="col-span-6 flex flex-col gap-2.5 border">
                        <h1 className="font-medium text-sm">Difficulty</h1>
                        <div className="w-full">
                            {/* Dropdown Header */}
                            <motion.header
                                initial={false}
                                onClick={() => {
                                    setDifficultyExpanded((prev) => !prev);
                                    setPlatformExpanded(false);
                                }}
                                className={``}
                            >
                                <div className="flex items-center gap-4 cursor-pointer">
                                    <span className="flex-1 font-semibold text-xl">
                                        {problemDetails.difficulty}
                                    </span>
                                    <ChevronDownCircle
                                        className={`cursor-pointer ${
                                            difficultyExpanded
                                                ? "transform rotate-180"
                                                : ""
                                        } transition-all duration-300`}
                                        size={18}
                                    />
                                </div>
                            </motion.header>
                            {/* Dropdown Content */}
                            <AnimatePresence initial={false}>
                                {difficultyExpanded && (
                                    <motion.section
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{
                                            open: {
                                                opacity: 1,
                                                height: "auto",
                                            },
                                            collapsed: {
                                                opacity: 0,
                                                height: 0,
                                            },
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.04, 0.62, 0.23, 0.98],
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <ul className="">
                                            {difficulty
                                                .filter(
                                                    (p) =>
                                                        p !==
                                                        problemDetails.difficulty
                                                )
                                                .map((p) => (
                                                    <li
                                                        key={p}
                                                        onClick={() => {
                                                            setProblemDetails({
                                                                ...problemDetails,
                                                                difficulty: p,
                                                            });
                                                            setDifficultyExpanded(
                                                                false
                                                            );
                                                        }}
                                                        className="cursor-pointer text-base text-stone-700 w-fit hover:bg-tnc-orange hover:text-white hover:font-medium hover:px-2 py-0.5 transition-all rounded-[8px]"
                                                    >
                                                        {p}
                                                    </li>
                                                ))}
                                        </ul>
                                    </motion.section>
                                )}
                            </AnimatePresence>
                        </div>
                    </BentoGridItem>

                    {/* Time Complexity Input */}
                    <BentoGridItem className="col-span-6 flex flex-col gap-3 border">
                        <h1 className="font-medium text-sm">Time Complexity</h1>
                        <span className="text-3xl font-semibold">
                            O
                            <input
                                type="text"
                                className="bg-transparent outline-none"
                                value={`(${problemDetails.time_complexity.slice(
                                    1,
                                    -1
                                )})`}
                                onChange={(e) =>
                                    setProblemDetails({
                                        ...problemDetails,
                                        time_complexity: e.target.value,
                                    })
                                }
                            />
                        </span>
                    </BentoGridItem>

                    {/* Space Complexity Input */}
                    <BentoGridItem className="col-span-6 flex flex-col gap-3 border">
                        <h1 className="font-medium text-sm">
                            Space Complexity
                        </h1>
                        <span className="text-3xl font-semibold">
                            O
                            <input
                                type="text"
                                className="bg-transparent outline-none"
                                value={`(${problemDetails.space_complexity.slice(
                                    1,
                                    -1
                                )})`}
                                onChange={(e) =>
                                    setProblemDetails({
                                        ...problemDetails,
                                        space_complexity: e.target.value,
                                    })
                                }
                            />
                        </span>
                    </BentoGridItem>

                    {/* Add Inventory Section */}
                    <BentoGridItem className="col-span-12 border flex flex-col gap-3">
                        <h1 className="font-semibold text-sm opacity-80">
                            Add Inventory
                        </h1>
                        {problemDetails?.inventories.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {problemDetails?.inventories.map(
                                    (inventory) => (
                                        <span
                                            key={inventory}
                                            className="bg-tnc-black text-white pl-3 pr-2 py-1 rounded-[20px] flex items-center"
                                        >
                                            {inventory}
                                            <X
                                                className="ml-2 cursor-pointer"
                                                size={20}
                                                onClick={() =>
                                                    handleAddInventoryRemove(
                                                        inventory
                                                    )
                                                }
                                            />
                                        </span>
                                    )
                                )}
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            {/* Search Input */}
                            <div className="flex items-center gap-2 bg-white border p-3 py-2 rounded-[20px]">
                                <SearchIcon
                                    size={20}
                                    className="text-tnc-darker-gray"
                                />
                                <input
                                    type="text"
                                    value={searchInventory}
                                    onChange={handleAddInventoryInputChange}
                                    onFocus={() =>
                                        setFilteredInventories(
                                            inventoriesFromServer
                                        )
                                    }
                                    onBlur={() =>
                                        setTimeout(
                                            () => setFilteredInventories([]),
                                            100
                                        )
                                    }
                                    placeholder="search-inventories"
                                    className="bg-transparent text-lg w-full outline-none font-medium placeholder:font-normal placeholder:text-tnc-darker-gray"
                                />
                            </div>
                            <AnimatePresence>
                                {filteredInventories.length > 0 && (
                                    <motion.section
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{
                                            open: {
                                                opacity: 1,
                                                height: "auto",
                                            },
                                            collapsed: {
                                                opacity: 0,
                                                height: 0,
                                            },
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.04, 0.62, 0.23, 0.98],
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <ul className="mt-2">
                                            {filteredInventories.map(
                                                (inventory) => (
                                                    <li
                                                        key={`${inventory.inventory_id}-${inventory.inventory_name}`}
                                                        onClick={() =>
                                                            handleAddInventorySelect(
                                                                inventory.inventory_name
                                                            )
                                                        }
                                                        className="cursor-pointer text-base text-stone-700 hover:bg-tnc-orange hover:text-white hover:font-medium hover:px-2 py-0.5 w-fit transition-all rounded-[8px]"
                                                    >
                                                        {inventoriesFromServer.includes(
                                                            inventory
                                                        )
                                                            ? inventory.inventory_name
                                                            : `Add "${inventory.inventory_name}"`}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </motion.section>
                                )}
                            </AnimatePresence>
                        </div>
                    </BentoGridItem>

                    {/* Notes Section */}
                    <BentoGridItem className="col-span-12 border flex flex-col gap-3">
                        <h1 className="font-medium text-sm">Notes</h1>
                        <textarea
                            className="bg-transparent text-lg outline-none"
                            placeholder="write-notes"
                            value={problemDetails.notes}
                            onChange={(e) =>
                                setProblemDetails({
                                    ...problemDetails,
                                    notes: e.target.value,
                                })
                            }
                        />
                    </BentoGridItem>

                    {/* Tags Section */}
                    <BentoGridItem className="col-span-12 border flex flex-col gap-3">
                        <h1 className="font-semibold text-sm opacity-80">
                            Tags
                        </h1>
                        {problemDetails?.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {problemDetails?.tags.map((tag) => (
                                    <span
                                        key={tag.tag_name}
                                        className="bg-tnc-black text-white pl-3 pr-2 py-1 rounded-[20px] flex items-center"
                                    >
                                        {tag.tag_name}
                                        <X
                                            className="ml-2 cursor-pointer"
                                            size={20}
                                            onClick={() =>
                                                handleRemoveTag(tag.tag_name)
                                            }
                                        />
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 bg-white border p-3 py-2 rounded-[20px]">
                                <SearchIcon
                                    size={20}
                                    className="text-tnc-darker-gray"
                                />
                                <input
                                    type="text"
                                    value={searchTag}
                                    onChange={handleTagInputChange}
                                    onKeyDown={handletagKeyDown}
                                    onFocus={() =>
                                        setFilteredTags(tagsFromServer)
                                    }
                                    onBlur={() =>
                                        setTimeout(
                                            () => setFilteredTags([]),
                                            100
                                        )
                                    }
                                    placeholder="search-tags"
                                    className="bg-transparent text-lg w-full outline-none font-medium placeholder:font-normal placeholder:text-tnc-darker-gray"
                                />
                            </div>
                            <AnimatePresence>
                                {filteredTags.length > 0 && (
                                    <motion.section
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{
                                            open: {
                                                opacity: 1,
                                                height: "auto",
                                            },
                                            collapsed: {
                                                opacity: 0,
                                                height: 0,
                                            },
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.04, 0.62, 0.23, 0.98],
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <ul className="mt-2 grid grid-cols-3 gap-x-3">
                                            {filteredTags.map((tag) => (
                                                <li
                                                    key={tag.tag_name}
                                                    onClick={() =>
                                                        handleTagSelect(tag)
                                                    }
                                                    className="cursor-pointer text-base text-stone-700 hover:bg-tnc-orange hover:text-white hover:font-medium hover:px-3 py-0.5 transition-all rounded-[10px] w-fit"
                                                >
                                                    {tagsFromServer.includes(
                                                        tag
                                                    )
                                                        ? tag.tag_name
                                                        : `Add "${tag.tag_name}"`}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.section>
                                )}
                            </AnimatePresence>
                        </div>
                    </BentoGridItem>

                    {/* Companies Section */}
                    <BentoGridItem className="col-span-12 border flex flex-col gap-3 focus:border-black">
                        <h1 className="font-semibold text-sm opacity-80">
                            Companies
                        </h1>
                        {problemDetails?.company_tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {problemDetails?.company_tags.map((company) => (
                                    <span
                                        key={company}
                                        className="bg-tnc-black text-white pl-3 pr-2 py-1 rounded-[20px] flex items-center"
                                    >
                                        {companiesNameToId[company]}
                                        <X
                                            className="ml-2 cursor-pointer"
                                            size={20}
                                            onClick={() =>
                                                handleCompanyRemove(company)
                                            }
                                        />
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <div
                                tabIndex={0}
                                className="flex items-center gap-2 border  bg-white p-3 py-2 rounded-[20px]"
                            >
                                <SearchIcon
                                    size={20}
                                    className="text-tnc-darker-gray"
                                />
                                <input
                                    type="text"
                                    value={searchCompany}
                                    onChange={handleCompanyInputChange}
                                    // onKeyDown={handleCompanyKeyDown}
                                    onFocus={() =>
                                        setFilteredCompanies(
                                            companiesFromServer
                                        )
                                    }
                                    onBlur={() =>
                                        setTimeout(
                                            () => setFilteredCompanies([]),
                                            100
                                        )
                                    }
                                    placeholder="search-companies"
                                    className="bg-transparent text-lg w-full outline-none font-medium placeholder:font-normal placeholder:text-tnc-darker-gray"
                                />
                            </div>
                            <AnimatePresence>
                                {filteredCompanies.length > 0 && (
                                    <motion.section
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{
                                            open: {
                                                opacity: 1,
                                                height: "auto",
                                            },
                                            collapsed: {
                                                opacity: 0,
                                                height: 0,
                                            },
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.04, 0.62, 0.23, 0.98],
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <ul className="mt-2 grid grid-cols-3 gap-x-3">
                                            {filteredCompanies.map(
                                                (company) => (
                                                    <li
                                                        key={company._id}
                                                        onClick={() =>
                                                            handleCompanySelect(
                                                                company
                                                            )
                                                        }
                                                        className="cursor-pointer text-base text-stone-700 hover:bg-tnc-orange hover:text-white hover:font-medium hover:px-3 py-0.5 transition-all rounded-[10px] w-fit"
                                                    >
                                                        {companiesFromServer.includes(
                                                            company
                                                        )
                                                            ? company.company_tag_name
                                                            : "No matches found"}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </motion.section>
                                )}
                            </AnimatePresence>
                        </div>
                    </BentoGridItem>

                    {/* Resources Section */}
                    <BentoGridItem className="col-span-12 border flex flex-col gap-3">
                        <h1 className="font-medium text-sm">Resources</h1>
                        <div className="flex">
                            <input
                                type="text"
                                value={resourceInput}
                                onChange={(e) =>
                                    setResourceInput(e.target.value)
                                }
                                onKeyDown={handleResourceKeyDown}
                                placeholder="add-resources"
                                className="bg-white border p-2 px-3 rounded-[16px] w-full text-lg font-medium outline-none placeholder:font-normal"
                            />
                            <button
                                onClick={handleAddResource}
                                className="ml-2 px-3 bg-tnc-black text-white text-sm rounded-[16px]"
                            >
                                <Plus className="" size={24} />
                            </button>
                        </div>
                        {problemDetails.resources.length > 0 && (
                            <div className="flex flex-col gap-2">
                                {problemDetails.resources.map((resource) => (
                                    <div
                                        key={resource}
                                        className="bg-tnc-black text-white pl-3 pr-2 py-1.5 rounded-[20px] flex items-center justify-between"
                                    >
                                        <Linkify
                                            options={{
                                                className:
                                                    "text-blue-500 dark:text-blue-400 underline hover:text-blue-600",
                                                target: "_blank",
                                            }}
                                        >
                                            {resource}
                                        </Linkify>
                                        <X
                                            className="cursor-pointer"
                                            size={20}
                                            onClick={() =>
                                                removeResource(resource)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </BentoGridItem>
                </BentoGrid>
                <button
                    className="cursor-pointer flex items-center gap-2 bg-tnc-orange text-white rounded-[24px] px-10 py-3 w-fit mx-auto mt-8"
                    onClick={handleSubmit}
                    disabled={addLoading}
                >
                    {addLoading ? "Saving..." : "Save Problem"}
                </button>
            </div>
            <Toaster />
        </div>
    );
}
