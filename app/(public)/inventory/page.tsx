"use client";
import Header from "@/app/components/Header";
import InventoryContainer from "@/app/components/containers/InventoryContainer";
import InventoryAddModal from "@/app/components/modals/InventoryAddModal";
import GetInventorySkeleton from "@/app/components/skeletons/GetInventorySkeleton";
import { Modal } from "@/app/components/ui/animated-modal";
import { BentoGrid } from "@/app/components/ui/bento-grid";
import {
    addInventory,
    getInventories,
} from "@/lib/features/inventory/inventorySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Inventory() {
    const dispatch = useAppDispatch();
    const { inventories, getLoading } = useAppSelector(
        (state) => state.inventory
    );

    console.log(inventories)

    const [inventoryDetails, setInventoryDetails] = useState({
        inventory_name: "",
        inventory_desc: "",
    });

    // const [inventories, setInventories] = useState(inventories);
    const handleAddInventory = () => {
        dispatch(addInventory(inventoryDetails));
        setInventoryDetails({
            inventory_name: "",
            inventory_desc: "",
        });
    };

    useEffect(() => {
        dispatch(getInventories());
    }, [dispatch]);

    if (getLoading) {
        return <GetInventorySkeleton />;
    }

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
                        <InventoryAddModal
                            inventoryDetails={inventoryDetails}
                            setInventoryDetails={setInventoryDetails}
                            handleAddInventory={handleAddInventory}
                        />
                    </Modal>
                </div>
                <div className="w-full">
                    <BentoGrid className="grid-cols-3 gap-5">
                        {inventories?.map((inventory) => (
                            <InventoryContainer
                                key={inventory.inventory_id}
                                inventory_id={inventory.inventory_id}
                                inventory_name={inventory.inventory_name}
                                inventory_desc={inventory.inventory_desc}
                                problem_count={inventory.problem_count}
                                createdAt={inventory.createdAt}
                            />
                        ))}
                    </BentoGrid>
                </div>
            </div>
            <Toaster />
        </div>
    );
}
