import { Pencil } from "lucide-react";
import {
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
    useModal,
} from "../ui/animated-modal";

export default function InventoryEditModal({
    inventoryDetails,
    setInventoryDetails,
    handleEditInventory,
    editLoading,
}: {
    inventoryDetails: {
        inventory_id: string;
        inventory_name: string;
        inventory_desc: string;
    };
    setInventoryDetails: (inventoryDetails: {
        inventory_id: string;
        inventory_name: string;
        inventory_desc: string;
    }) => void;
    handleEditInventory: (
        inventory_id: string,
        inventory_name: string,
        inventory_desc: string
    ) => void;

    editLoading: boolean;
}) {
    const { setOpen } = useModal();

    return (
        <>
            <ModalTrigger className="h-[30px] w-[30px] flex justify-center items-center bg-tnc-black text-white p-2 rounded-[12px] hover:bg-yellow-500 transition-all cursor-pointer group/modal-btn">
                <Pencil width={16} height={16} />
            </ModalTrigger>
            <ModalBody>
                <ModalContent>
                    <h4 className="text-lg md:text-2xl text-tnc-black font-bold text-center mb-8">
                        Edit Inventory
                    </h4>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            
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
                        onClick={() => {
                            handleEditInventory(
                                inventoryDetails.inventory_id,
                                inventoryDetails.inventory_name,
                                inventoryDetails.inventory_desc
                            );
                            setOpen(false);
                        }}
                        disabled={editLoading}
                    >
                        {editLoading ? "Editing..." : "Edit"}
                    </button>
                </ModalFooter>
            </ModalBody>
        </>
    );
}
