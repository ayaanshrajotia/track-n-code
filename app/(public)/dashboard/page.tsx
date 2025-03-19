import Header from "@/app/components/Header";
import LineGraph from "@/app/components/Line";
import { BentoGrid, BentoGridItem } from "@/app/components/ui/bento-grid";
import { platforms } from "@/libs/utils";
import { Pencil } from "lucide-react";
// import { Frown, Laugh, Meh } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Dashboard() {
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
                        {/* <BentoGridItem className="col-span-3 relative w-full h-full overflow-hidden">
                        <Image
                        src="/images/ayaansh.jpg"
                        alt=""
                        className="object-cover"
                            layout="fill"
                        />
                        </BentoGridItem> */}
                        <BentoGridItem className="col-span-6 bg-tnc-black text-white flex items-center gap-5">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden">
                                <Image
                                    src="/images/ayaansh.png"
                                    alt=""
                                    className="absolute object-cover"
                                    layout="fill"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-medium leading-none">
                                    Ayaansh Rajotia
                                </h1>
                                <p className="text-sm text-neutral-200">
                                    ayaanshrajotia
                                </p>
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
                                {/* <Meh className="w-9 h-9" strokeWidth={2} /> */}
                                56
                            </span>
                        </BentoGridItem>
                        <BentoGridItem className="col-span-3 bg-orange-600 text-white flex flex-col justify-between gap-3">
                            <h1 className="font-semibold leading-none">
                                Revision
                            </h1>
                            <span className="text-[48px] flex gap-2.5 items-center tracking-wide font-medium leading-none">
                                {/* <Meh className="w-9 h-9" strokeWidth={2} /> */}
                                56
                            </span>
                        </BentoGridItem>
                        <BentoGridItem className="col-span-4 flex flex-col justify-between gap-3 border">
                            <h1 className="font-semibold">Easy</h1>
                            <span className="text-[48px] flex gap-2.5 items-center tracking-wide font-medium">
                                {/* <Laugh className="w-9 h-9" strokeWidth={2} /> */}
                                213
                            </span>
                        </BentoGridItem>
                        <BentoGridItem className="col-span-4 flex flex-col justify-between border">
                            <h1 className="font-semibold ">Medium</h1>

                            <span className="text-[48px] flex gap-2.5 items-center tracking-wide font-medium">
                                {/* <Meh className="w-9 h-9" strokeWidth={2} /> */}
                                56
                            </span>
                        </BentoGridItem>
                        <BentoGridItem className="col-span-4 flex flex-col justify-between border">
                            <h1 className="font-semibold ">Hard</h1>

                            <span className="text-[48px] flex gap-2.5 items-center tracking-wide font-medium">
                                {/* <Frown className="w-9 h-9" strokeWidth={2} /> */}
                                14
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
                    <BentoGrid className="w-[310px] grid-cols-1 gap-5">
                        {platforms.map((platform) => (
                            <BentoGridItem key={platform.id} className="border">
                                <div className={"w-full flex flex-col gap-4"}>
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
                                            <span className="text-sm">
                                                {platform.username}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-4xl font-medium tracking-wide">
                                        1421
                                    </div>
                                </div>
                            </BentoGridItem>
                        ))}
                    </BentoGrid>
                </div>
            </div>
        </div>
    );
}
