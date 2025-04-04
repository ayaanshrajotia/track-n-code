import React from "react";
import {
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
    useModal,
} from "../ui/animated-modal";

export default function InventoryAddModal({
    inventoryDetails,
    setInventoryDetails,
    handleAddInventory,
}: {
    inventoryDetails: {
        inventory_name: string;
        inventory_desc: string;
    };
    setInventoryDetails: (inventoryDetails: {
        inventory_name: string;
        inventory_desc: string;
    }) => void;
    handleAddInventory: () => void;
}) {
    const { setOpen } = useModal();

    return (
        <>
            <ModalTrigger className="bg-tnc-orange text-white rounded-[24px] flex justify-between gap-2 items-center px-5 py-3 cursor-pointer group/modal-btn overflow-hidden">
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
                                                htmlFor="inventory_name"
                                                className="text-xs font-medium uppercase ml-1"
                                            >
                                                inventory_name
                                            </label> */}
                            <input
                                id="title"
                                type="text"
                                placeholder="Title"
                                className="bg-tnc-gray h-12 outline-none px-4 py-2 rounded-[12px]"
                                value={inventoryDetails.inventory_name}
                                onChange={(e) =>
                                    setInventoryDetails({
                                        ...inventoryDetails,
                                        inventory_name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            {/* <label
                                                htmlFor="inventory_desc"
                                                className="text-xs font-medium uppercase ml-1"
                                            >
                                                inventory_desc
                                            </label> */}
                            <input
                                id="inventory_desc"
                                type="text"
                                placeholder="Description"
                                className="bg-tnc-gray h-12 outline-none px-4 py-2 rounded-[12px]"
                                value={inventoryDetails.inventory_desc}
                                onChange={(e) =>
                                    setInventoryDetails({
                                        ...inventoryDetails,
                                        inventory_desc: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </ModalContent>
                <ModalFooter className="gap-4">
                    <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-[24px] text-sm w-28">
                        Cancel
                    </button>
                    <button
                        className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-[24px] border border-black w-28"
                        onClick={ () => {
                            handleAddInventory();
                            setOpen(false);
                        }}
                    >
                        Add
                    </button>
                </ModalFooter>
            </ModalBody>
        </>
    );
}
