import { InventoryType } from "@/types/types";
import { BentoGridItem } from "../ui/bento-grid";
import Link from "next/link";
import { ArrowRight, Trash2 } from "lucide-react";
import moment from "moment";
import { useAppDispatch } from "@/lib/hooks";
import {
    deleteInventory,
    editInventory,
} from "@/lib/features/inventory/inventorySlice";
import toast from "react-hot-toast";
import { Modal } from "../ui/animated-modal";
import InventoryEditModal from "../modals/InventoryEditModal";
import { useState } from "react";

export default function InventoryContainer({
    inventory_id,
    inventory_name,
    inventory_desc,
    problemCount,
    createdAt,
}: InventoryType) {
    const dispatch = useAppDispatch();

    const [inventoryDetails, setInventoryDetails] = useState({
        inventory_name,
        inventory_desc,
        inventory_id,
    });

    const handleDeleteInventory = async (inventory_id: string) => {
        try {
            const response = await dispatch(
                deleteInventory({ inventory_id })
            ).unwrap();
            toast.success(response.message);
        } catch (error) {
            toast.error(
                (typeof error === "string" && error) ||
                    "Failed to delete inventory"
            );
        }
    };

    const handleEditInventory = async (
        inventory_id: string,
        inventory_name: string,
        inventory_desc: string
    ) => {
        try {
            const response = await dispatch(
                editInventory({ inventory_id, inventory_name, inventory_desc })
            ).unwrap();
            toast.success(response.message);
        } catch (error) {
            toast.error(
                (typeof error === "string" && error) ||
                    "Failed to edit inventory"
            );
        }
    };

    return (
        <BentoGridItem className="flex flex-col transition-all bg-tnc-gray cursor-pointer justify-between pb-3.5">
            <div className="flex flex-col">
                <span className="text-xs sm:text-sm opacity-70 mb-1">
                    {moment(createdAt).format("DD/MM/YYYY")}
                </span>
                <div className="flex flex-col">
                    <h1 className="font-semibold text-lg sm:text-xl md:text-2xl truncate block max-w-full">
                        {inventory_name}
                    </h1>
                    <p className="text-sm sm:text-base opacity-70 line-clamp-2">
                        {inventory_desc}
                    </p>
                </div>
            </div>

            <div>
                <div className="w-full h-[1px] bg-black opacity-10 my-4"></div>
                <div className="min-[720px]:items-end min-[720px]:flex-row flex flex-col items-start  gap-3 md:gap-0 justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs opacity-70 uppercase">
                            Problems
                        </span>
                        <span className="text-[40px] font-medium leading-none">
                            {problemCount || 0}
                        </span>
                    </div>

                    <div className="sm:flex-row flex flex-col gap-3 justify-between md:justify-normal mb-1 w-full md:w-fit">
                        <Modal>
                            <InventoryEditModal
                                inventoryDetails={inventoryDetails}
                                setInventoryDetails={setInventoryDetails}
                                handleEditInventory={handleEditInventory}
                                editLoading={false}
                            />
                        </Modal>
                        <button
                            onClick={() => handleDeleteInventory(inventory_id)}
                            className="h-[30px] w-[30px] flex justify-center items-center bg-tnc-black text-white p-1.5 rounded-[12px] hover:bg-red-600 transition-all"
                        >
                            <Trash2 width={16} height={16} />
                        </button>
                        <Link
                            href={`/inventory/${inventory_id}`}
                            className="h-[30px] w-[30px] flex justify-center items-center bg-tnc-black text-white p-1.5 rounded-[12px]"
                        >
                            <ArrowRight className="" width={18} height={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </BentoGridItem>
    );
}
