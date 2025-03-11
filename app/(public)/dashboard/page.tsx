import Header from "@/app/components/Header";
import LineGraph from "@/app/components/Line";
import { BentoGrid, BentoGridItem } from "@/app/components/ui/bento-grid";
import Image from "next/image";

type Platform = {
    id: number;
    platform: string;
    username: string;
    imgSrc: string;
};

const platforms: Platform[] = [
    {
        id: 1,
        platform: "Leetcode",
        username: "ayaanshrajotia",
        imgSrc: "https://creatorspace.imgix.net/sites/favicons/aHR0cHM6Ly9sZWV0Y29kZS5jb20vZmF2aWNvbi5pY28=.ico?fm=png",
    },
    {
        id: 2,
        platform: "Codeforces",
        username: "ayaanshrajotia",
        imgSrc: "https://creatorspace.imgix.net/sites/favicons/aHR0cHM6Ly9jb2RlZm9yY2VzLmNvbS9mYXZpY29uLmljbw==.ico?fm=png",
    },
    {
        id: 3,
        platform: "Codechef",
        username: "ayaanshrajotia",
        imgSrc: "https://creatorspace.imgix.net/sites/favicons/aHR0cHM6Ly93d3cuY29kZWNoZWYuY29tL2Zhdmljb24uaWNv.ico?fm=png",
    },
    {
        id: 4,
        platform: "GeeksforGeeks",
        username: "ayaanshrajotia",
        imgSrc: "https://storage.googleapis.com/creatorspace-public/sites%2Ffavicons%2FaHR0cHM6Ly9tZWRpYS5nZWVrc2ZvcmdlZWtzLm9yZy93cC1jb250ZW50L2Nkbi11cGxvYWRzL2dmZ19mYXZpY29uLnBuZw%3D%3D.png",
    },
];

export default async function Dashboard() {
    return (
        <div>
            <Header>Dashboard</Header>
            <div className="flex gap-4 leading-none">
                <BentoGrid className="flex-grow grid-cols-12">
                    {/* <BentoGridItem className="col-span-2 relative w-full h-full overflow-hidden">
                        <Image
                            src="/images/ayaansh.jpg"
                            alt=""
                            className=""
                            layout="fill"
                        />
                    </BentoGridItem> */}
                    <BentoGridItem className="col-span-6 bg-tnc-black h-[140px] text-white flex flex-col gap-3">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-medium">
                                Ayaansh Rajotia
                            </h1>
                            <p className="text-sm text-neutral-200">
                                ayaanshrajotia
                            </p>
                        </div>
                        <span className="text-[44px] font-medium">100</span>
                    </BentoGridItem>
                    <BentoGridItem className="col-span-3 bg-[#3880fc] text-white flex flex-col justify-between">
                        <h1 className="text-lg font-medium">
                            Questions Solved
                        </h1>
                        <span className="text-[44px] font-medium">450</span>
                    </BentoGridItem>
                    <BentoGridItem className="col-span-3 bg-tnc-orange text-white flex flex-col justify-between">
                        <h1 className="text-lg font-medium">Revision</h1>
                        <span className="text-[44px] font-medium">121</span>
                    </BentoGridItem>
                    <BentoGridItem className="col-span-4 flex flex-col justify-between h-[120px] border">
                        <h1 className="text-lg font-medium ">Easy</h1>

                        <span className="text-[48px] font-medium">213</span>
                    </BentoGridItem>
                    <BentoGridItem className="col-span-4  flex flex-col justify-between  border">
                        <h1 className="text-lg font-medium">Medium</h1>

                        <span className="text-[48px] font-medium">56</span>
                    </BentoGridItem>
                    <BentoGridItem className="col-span-4  flex flex-col justify-between border">
                        <h1 className="text-lg font-medium">Hard</h1>

                        <span className="text-[48px] font-medium">18</span>
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
                <BentoGrid className="w-[300px] grid-cols-1">
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
                                <div className="text-4xl font-medium">1421</div>
                            </div>
                        </BentoGridItem>
                    ))}
                </BentoGrid>
            </div>
        </div>
    );
}
