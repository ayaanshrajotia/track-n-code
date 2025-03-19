"use client";
import Header from "@/app/components/Header";
import { BentoGrid, BentoGridItem } from "@/app/components/ui/bento-grid";
import { platforms } from "@/libs/utils";
import { CircleArrowUp, Pencil } from "lucide-react";
import { Lock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function EditDashboard() {
    // State to manage user details
    const [userDetails, setUserDetails] = useState({
        name: "Ayaansh Rajotia",
        username: "ayaanshrajotia",
    });

    // State to manage profile image
    const [profileImage, setProfileImage] = useState("/images/ayaansh.jpg");

    // Handler for changing profile image
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    return (
        <div>
            <Header>Edit Dashboard</Header>
            <div className="flex flex-col gap-16 leading-none">
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-semibold">Profile</h1>
                    <div className="flex gap-10 h-[280px] w-full justify-center items-center">
                        <div className="flex flex-col items-center justify-between h-full">
                            <div className="relative w-[220px] h-[220px] overflow-hidden rounded-full border-2">
                                <Image
                                    src={profileImage}
                                    alt="Profile"
                                    layout="fill"
                                    className="object-cover"
                                />
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                id="profile-image"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <label
                                htmlFor="profile-image"
                                className="cursor-pointer flex items-center gap-2 bg-tnc-black text-white rounded-[12px] px-4 py-2 w-fit"
                            >
                                Upload <CircleArrowUp width={18} />
                            </label>
                        </div>
                        <div className="flex flex-col justify-between h-full">
                            <BentoGridItem className="col-span-6 bg-tnc-black text-white flex flex-col gap-3 min-w-[300px] py-4">
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-sm text-neutral-200">
                                        Name
                                    </p>
                                    <div className="relative flex items-center justify-between hover:bg-[#333333] focus-within:bg-[#333333] rounded-[12px] transition-all">
                                        <input
                                            type="text"
                                            className="peer w-full text-lg leading-none font-medium bg-transparent text-white outline-none py-1 focus-within:px-2 hover:px-2 rounded-[12px] transition-all"
                                            value={userDetails.name}
                                            onChange={(e) =>
                                                setUserDetails({
                                                    ...userDetails,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                        <Pencil
                                            className="absolute right-0 peer-hover:hidden peer-focus-within:hidden transition-all"
                                            width={16}
                                        />
                                    </div>
                                </div>
                            </BentoGridItem>
                            <BentoGridItem className="col-span-6 bg-tnc-black text-white flex flex-col gap-3 min-w-[300px] py-4">
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-sm text-neutral-200">
                                        Username
                                    </p>
                                    <div className="relative flex items-center justify-between hover:bg-[#333333] focus-within:bg-[#333333] rounded-[12px] transition-all">
                                        <input
                                            type="text"
                                            className="peer w-full text-lg leading-none font-medium bg-transparent text-white outline-none py-1 focus-within:px-2 hover:px-2 rounded-[12px] transition-all"
                                            value={userDetails.username}
                                            onChange={(e) =>
                                                setUserDetails({
                                                    ...userDetails,
                                                    username: e.target.value,
                                                })
                                            }
                                        />
                                        <Pencil
                                            className="absolute right-0 peer-hover:hidden peer-focus-within:hidden transition-all"
                                            width={16}
                                        />
                                    </div>
                                </div>
                            </BentoGridItem>
                            <BentoGridItem className="col-span-6 bg-tnc-black text-white flex flex-col gap-3 min-w-[300px] py-4">
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-sm text-neutral-200">
                                        Email
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg leading-none font-medium bg-tnc-black text-white outline-none py-1">
                                            rajotiaayaansh@gmail.com
                                        </span>
                                        <Lock width={16} />
                                    </div>
                                </div>
                            </BentoGridItem>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-semibold">Platforms</h1>
                    <BentoGrid className="grid-cols-3 gap-5">
                        {platforms.map((platform) => (
                            <BentoGridItem
                                key={platform.id}
                                className="bg-tnc-gray p-4 border"
                            >
                                <div className="w-full flex flex-col gap-2">
                                    <div className="flex gap-2 items-center">
                                        <div className="relative w-9 h-9 border-[1px] rounded-xl bg-white">
                                            <Image
                                                src={platform.imgSrc}
                                                alt=""
                                                className="absolute p-1.5"
                                                fill
                                                sizes="100"
                                            />
                                        </div>
                                        <h1 className="font-medium text-lg">
                                            {platform.platform}
                                        </h1>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="group">
                                            <div className="relative flex items-center rounded-[12px] transition-all group-hover:bg-[#e9e9e9] p-1">
                                                {/* Username text (shown by default) */}
                                                <div className="flex w-full gap-2 group-hover:hidden items-center transition-all">
                                                    <span className="text-lg font-medium">
                                                        {userDetails.username}
                                                    </span>
                                                    <Pencil width={16} />
                                                </div>
                                                {/* Input field (shown on hover) */}
                                                <input
                                                    type="text"
                                                    className="hidden group-hover:block w-full bg-transparent outline-none text-lg font-medium px-2 rounded-[12px] transition-all"
                                                    value={userDetails.username}
                                                    onChange={(e) =>
                                                        setUserDetails({
                                                            ...userDetails,
                                                            username:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <span className="text-4xl font-medium tracking-wide">
                                            1421
                                        </span>
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
