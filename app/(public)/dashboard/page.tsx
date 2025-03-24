"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/app/components/Header";
import LineGraph from "@/app/components/Line";
import { BentoGrid, BentoGridItem } from "@/app/components/ui/bento-grid";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAppSelector } from "@/lib/hooks";
import { ratingPlatforms } from "@/app/utils/utils";

export default function Dashboard() {
    const user = useAppSelector((state) => state.user);
    console.log(user);

    const [ratings, setRatings] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    console.log(ratings);

    useEffect(() => {
        async function fetchRatings() {
            const platformRequests = ratingPlatforms.map(async (platform) => {
                try {
                    const response = await axios.get(
                        `/api/ratings?platform=${platform.platform}&username=${platform.username}`
                    );
                    return { [platform.id]: response.data.rating };
                } catch (error) {
                    console.error(`Error fetching ${platform.id}:`, error);
                    return { [platform.id]: "N/A" };
                }
            });

            const results = await Promise.all(platformRequests);
            const ratingData = results.reduce(
                (acc, curr) => ({ ...acc, ...curr }),
                {}
            );
            setRatings(ratingData);
            setLoading(false);
        }

        fetchRatings();
    }, []);

    return (
        <div>
            <Header>Dashboard</Header>
            <div className="flex flex-col gap-4">
                <Link
                    href={"/dashboard/edit"}
                    className="bg-tnc-black text-white rounded-[28px] flex justify-between items-center px-10 py-3 cursor-pointer relative overflow-hidden group w-fit self-end"
                >
                    <span className="text-center transition-transform duration-500 uppercase text-sm font-semibold group-hover:translate-x-40">
                        Edit
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 -translate-x-40 group-hover:translate-x-0">
                        <Pencil width={20} />
                    </div>
                </Link>
                <div className="flex gap-4 leading-none">
                    <BentoGrid className="flex-grow grid-cols-12 gap-4">
                        <BentoGridItem className="h-[140px] col-span-6 bg-tnc-black text-white flex items-center gap-5">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden">
                                <Image
                                    src="/images/ayaansh.png"
                                    alt=""
                                    className="absolute object-cover"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <h1 className="text-2xl font-medium leading-none">
                                        Ayaansh Rajotia
                                    </h1>
                                    <p className="text-sm text-neutral-200">
                                        ayaanshrajotia
                                    </p>
                                </div>
                                <span className="text-[44px] font-medium tracking-wide leading-none">
                                    100
                                </span>
                            </div>
                        </BentoGridItem>
                        <BentoGridItem className="col-span-3 bg-blue-600 text-white flex flex-col justify-between gap-3">
                            <h1 className="font-semibold leading-none">
                                Questions Solved
                            </h1>
                            <span className="text-[48px] flex gap-2.5 items-center tracking-wide font-medium leading-none">
                                56
                            </span>
                        </BentoGridItem>
                        <BentoGridItem className="col-span-3 bg-orange-600 text-white flex flex-col justify-between gap-3">
                            <h1 className="font-semibold leading-none">
                                Revision
                            </h1>
                            <span className="text-[48px] flex gap-2.5 items-center tracking-wide font-medium leading-none">
                                56
                            </span>
                        </BentoGridItem>
                        <BentoGridItem className="col-span-12 bg-tnc-black text-white">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-lg font-medium">
                                    Weekly Progress
                                </h1>
                                <div>
                                    <LineGraph />
                                </div>
                            </div>
                        </BentoGridItem>
                        <BentoGridItem className="col-span-12">
                            Enjoy the journey.
                        </BentoGridItem>
                    </BentoGrid>

                    {loading ? (
                        <div className="flex flex-col gap-4">
                            <Skeleton
                                width={310}
                                height={140}
                                borderRadius={24}
                            />
                            <Skeleton
                                width={310}
                                height={140}
                                borderRadius={24}
                            />
                            <Skeleton
                                width={310}
                                height={140}
                                borderRadius={24}
                            />
                            <Skeleton
                                width={310}
                                height={140}
                                borderRadius={24}
                            />
                            <Skeleton
                                width={310}
                                height={140}
                                borderRadius={24}
                            />
                        </div>
                    ) : (
                        <BentoGrid className="w-[310px] grid-cols-1 gap-4">
                            {ratingPlatforms.map((platform) => (
                                <BentoGridItem
                                    key={platform.id}
                                    className="border h-[140px]"
                                >
                                    <div className="w-full h-full flex flex-col justify-between">
                                        <div className="flex gap-2 items-center">
                                            <div className="relative w-9 h-9 border-[1px] rounded-xl bg-white">
                                                <Image
                                                    src={platform.imgSrc}
                                                    alt=""
                                                    className="absolute p-1.5"
                                                    fill
                                                    sizes="9"
                                                />
                                            </div>
                                            <div>
                                                <h1 className="font-semibold">
                                                    {platform.platform}
                                                </h1>
                                                <span className="text-sm truncate block max-w-[200px]">
                                                    {platform.username}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-4xl font-medium tracking-wide">
                                            {ratings[platform.id] ||
                                                "Loading..."}
                                        </div>
                                    </div>
                                </BentoGridItem>
                            ))}
                        </BentoGrid>
                    )}
                </div>
            </div>
        </div>
    );
}
