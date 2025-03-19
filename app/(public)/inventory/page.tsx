"use client";
import Header from "@/app/components/Header";
import InventoryContainer from "@/app/components/containers/InventoryContainer";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "@/app/components/ui/animated-modal";
import { BentoGrid } from "@/app/components/ui/bento-grid";
import { inventories } from "@/libs/utils";
import { SearchIcon } from "lucide-react";

export default function Inventory() {
    return (
        <div>
            <Header>Inventory</Header>
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div className="bg-white border p-5 py-3 rounded-[24px] flex gap-4 w-[350px] focus-within:border-tnc-dark-gray transition-all">
                        <input
                            type="text"
                            placeholder="Search for inventories"
                            className="bg-transparent outline-none w-full placeholder:text-stone-400 "
                        />
                        <SearchIcon className="" strokeWidth={2} width={28} />
                    </div>
                    <Modal>
                        <ModalTrigger className="bg-tnc-orange text-white rounded-[24px] flex justify-between gap-2 items-center px-5 py-3 cursor-pointer group/modal-btn">
                            <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 uppercase text-sm font-semibold">
                                Add Inventory
                            </span>
                            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20 text-lg">
                                📒
                            </div>
                        </ModalTrigger>
                        <ModalBody>
                            <ModalContent>
                                <h4 className="text-lg md:text-2xl text-tnc-black font-bold text-center mb-8">
                                    Add a new inventory
                                </h4>
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-1">
                                        {/* <label
                                            htmlFor="title"
                                            className="text-xs font-medium uppercase ml-1"
                                        >
                                            Title
                                        </label> */}
                                        <input
                                            id="title"
                                            type="text"
                                            placeholder="Title"
                                            className="bg-tnc-gray h-12 outline-none px-4 py-2 rounded-[12px]"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {/* <label
                                            htmlFor="description"
                                            className="text-xs font-medium uppercase ml-1"
                                        >
                                            Description
                                        </label> */}
                                        <input
                                            id="description"
                                            type="text"
                                            placeholder="Description"
                                            className="bg-tnc-gray h-12 outline-none px-4 py-2 rounded-[12px]"
                                        />
                                    </div>
                                </div>
                            </ModalContent>
                            <ModalFooter className="gap-4">
                                <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-[24px] text-sm w-28">
                                    Cancel
                                </button>
                                <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-[24px] border border-black w-28">
                                    Add
                                </button>
                            </ModalFooter>
                        </ModalBody>
                    </Modal>
                </div>
                <div className="w-full">
                    <BentoGrid className="grid-cols-3 gap-5">
                        {inventories.map((inventory) => (
                            <InventoryContainer
                                key={inventory.id}
                                id={inventory.id}
                                title={inventory.title}
                                description={inventory.description}
                                slug={inventory.slug}
                                problemCount={inventory.problemCounts}
                                createdAt={inventory.createdAt}
                            />
                        ))}
                    </BentoGrid>
                </div>
            </div>
        </div>
    );
}
