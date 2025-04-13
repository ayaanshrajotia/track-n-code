import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import Skeleton from "react-loading-skeleton";
import Header from "../Header";

export default function GetInventorySkeleton() {
    return (
        <div className="flex flex-col">
            <Header>Inventory</Header>
            <div className="flex justify-between gap-5 mb-4">
                <Skeleton borderRadius={24} width={300} className="h-[50px]" />
                <Skeleton borderRadius={24} width={200} className="h-[50px]" />
            </div>
            <div className="grid grid-cols-3 gap-5">
                <Skeleton borderRadius={24} className="h-[200px]" />
                <Skeleton borderRadius={24} className="h-[200px]" />
                <Skeleton borderRadius={24} className="h-[200px]" />
                <Skeleton borderRadius={24} className="h-[200px]" />
                <Skeleton borderRadius={24} className="h-[200px]" />
                <Skeleton borderRadius={24} className="h-[200px]" />
                <Skeleton borderRadius={24} className="h-[200px]" />
                <Skeleton borderRadius={24} className="h-[200px]" />
                <Skeleton borderRadius={24} className="h-[200px]" />
            </div>
        </div>
    );
}
