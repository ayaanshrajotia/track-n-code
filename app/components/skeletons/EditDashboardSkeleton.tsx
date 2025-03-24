import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../Header";

export default function EditDashboardSkeleton() {
    return (
        <div className="relative min-h-screen w-screen-xl mx-auto">
            <Header>Edit Dashboard</Header>
            <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-semibold">Profile</h1>
                    <div className="flex gap-12 h-[280px] w-full justify-center items-center">
                        <div className="flex flex-col h-[280px] justify-between items-center">
                            <Skeleton
                                borderRadius={999}
                                width={200}
                                className="h-[200px]"
                            />
                            <Skeleton
                                width={160}
                                borderRadius={24}
                                className="h-[50px]"
                            />
                        </div>
                        <div className="flex flex-col justify-between h-[280px]">
                            <Skeleton
                                width={300}
                                borderRadius={24}
                                className="h-[80px]"
                            />
                            <Skeleton
                                width={300}
                                borderRadius={24}
                                className="h-[80px]"
                            />
                            <Skeleton
                                width={300}
                                borderRadius={24}
                                className="h-[80px]"
                            />
                        </div>
                        <Skeleton
                            width={300}
                            borderRadius={24}
                            className="h-[280px]"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-semibold">Platforms</h1>
                    <div className="grid w-full justify-center items-center grid-cols-3 gap-5">
                        <Skeleton borderRadius={24} className="h-[100px]" />
                        <Skeleton borderRadius={24} className="h-[100px]" />
                        <Skeleton borderRadius={24} className="h-[100px]" />
                        <Skeleton borderRadius={24} className="h-[100px]" />
                        <Skeleton borderRadius={24} className="h-[100px]" />
                        <Skeleton borderRadius={24} className="h-[100px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
