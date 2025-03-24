"use client";
import Header from "@/app/components/Header";
import EditDashboardSkeleton from "@/app/components/skeletons/EditDashboardSkeleton";
import { BentoGrid, BentoGridItem } from "@/app/components/ui/bento-grid";
import { capitalizeFirstLetter, ratingImagesMap } from "@/app/utils/utils";
import {
    clearMessage,
    getUserDashboardEdit,
    updateUserDashboardEdit,
} from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Rating } from "@/types/types";
import { CircleArrowUp, Pencil } from "lucide-react";
import { Lock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Switch from "react-switch";

export default function EditDashboard() {
    const dispatch = useAppDispatch();

    // Extract user details from the Redux store
    const {
        full_name,
        email,
        username,
        profile_image,
        ratings,
        error,
        message,
        editLoading,
        loading,
    } = useAppSelector((state) => state.user);

    // Local state for editable ratings, name, and profile image
    const [editableRatings, setEditableRatings] = useState<Rating[]>(
        ratings || []
    );
    const [editableName, setEditableName] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // Fetch user dashboard edit data when the component mounts
    useEffect(() => {
        dispatch(getUserDashboardEdit());
    }, [dispatch]);

    // Update local state when user details change
    useEffect(() => {
        if (full_name) setEditableName(full_name);
        if (profile_image) setPreviewImage(profile_image);
        if (ratings) setEditableRatings(ratings);
    }, [full_name, profile_image, ratings]);

    useEffect(() => {
        if (message) {
            toast.success(message); // ✅ Show success toast
            dispatch(clearMessage()); // Clear message from Redux
        }
        if (error) {
            toast.error(error); // ❌ Show error toast
            dispatch(clearMessage()); // Clear error from Redux
        }
    }, [message, error, dispatch]);

    // Handle profile image change and update the local state
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setSelectedImage(file);
        }
    };

    // Toggle the visibility of a rating by its platform
    const handleToggle = (platform: string) => {
        setEditableRatings((prevRatings) =>
            prevRatings.map((rating) =>
                rating.platform === platform
                    ? { ...rating, show: !rating.show }
                    : rating
            )
        );
    };

    // Update the username for a specific rating by its ID
    const handleUsernameChange = (platform: string, newUsername: string) => {
        setEditableRatings((prevRatings) =>
            prevRatings.map((rating) =>
                rating.platform === platform
                    ? { ...rating, username: newUsername }
                    : rating
            )
        );
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();

        // Append text fields
        formData.append("full_name", editableName);
        formData.append("username", username);
        formData.append("email", email);

        if (selectedImage) {
            formData.append("profile_image", selectedImage);
            formData.append("is_image_changed", "true");
        } else {
            formData.append("is_image_changed", "false");
        }

        // Append ratings as JSON
        formData.append("ratings", JSON.stringify(editableRatings));

        // Dispatch action or send API request
        dispatch(updateUserDashboardEdit(formData));
    };

    if (loading) return <EditDashboardSkeleton />;

    return (
        <div>
            {/* Header Section */}
            <Header>Edit Dashboard</Header>
            <div className="flex flex-col gap-16 leading-none">
                {/* Profile Section */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-semibold">Profile</h1>
                    <div className="flex gap-12 h-[280px] w-full justify-center items-center">
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center justify-between h-full">
                            <div
                                className={`relative w-[220px] h-[220px] overflow-hidden rounded-full ${
                                    !previewImage
                                        ? "grayscale contrast-125"
                                        : ""
                                }`}
                            >
                                <Image
                                    src={
                                        previewImage ||
                                        "/images/user-avatar.png"
                                    }
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* File Input for Profile Image */}
                            <input
                                type="file"
                                accept="image/*"
                                id="profile-image"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            {/* Upload Button */}
                            <label
                                htmlFor="profile-image"
                                className="cursor-pointer flex items-center gap-2 bg-tnc-black text-white rounded-[24px] px-4 py-2 w-fit"
                            >
                                Upload <CircleArrowUp width={18} />
                            </label>
                        </div>
                        {/* Editable Name, Username, and Email Section */}
                        <div className="flex flex-col justify-between h-full">
                            {/* Editable Name */}
                            <BentoGridItem className="col-span-6 bg-tnc-black text-white flex flex-col gap-3 min-w-[300px] py-4">
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-sm text-neutral-200">
                                        Name
                                    </p>
                                    <div className="relative flex items-center justify-between hover:bg-[#333333] focus-within:bg-[#333333] rounded-[12px] transition-all">
                                        <input
                                            type="text"
                                            className="peer w-full text-lg leading-none font-medium bg-transparent text-white outline-none py-1 focus-within:px-2 hover:px-2 rounded-[12px] transition-all"
                                            value={editableName}
                                            onChange={(e) =>
                                                setEditableName(e.target.value)
                                            }
                                        />
                                        <Pencil
                                            className="absolute right-0 peer-hover:hidden peer-focus-within:hidden transition-all"
                                            width={16}
                                        />
                                    </div>
                                </div>
                            </BentoGridItem>
                            {/* Non-editable Username */}
                            <BentoGridItem className="col-span-6 bg-tnc-black text-white flex flex-col gap-3 min-w-[300px] py-4 cursor-not-allowed">
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-sm text-neutral-200">
                                        Username
                                    </p>
                                    <div className="relative flex items-center justify-between  gap-4">
                                        <span className="text-lg leading-none font-medium bg-tnc-black text-white outline-none py-1">
                                            {username}
                                        </span>
                                        <Lock width={16} />
                                    </div>
                                </div>
                            </BentoGridItem>
                            {/* Non-editable Email */}
                            <BentoGridItem className="col-span-6 bg-tnc-black text-white flex flex-col gap-3 min-w-[300px] py-4 cursor-not-allowed">
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-sm text-neutral-200">
                                        Email
                                    </p>
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-lg leading-none font-medium bg-tnc-black text-white outline-none py-1">
                                            {email}
                                        </span>
                                        <Lock width={16} />
                                    </div>
                                </div>
                            </BentoGridItem>
                        </div>
                        {/* Settings Section */}
                        <BentoGridItem className="bg-tnc-black text-white h-full rounded-[24px] p-5 pt-4 flex flex-col gap-3">
                            <p className="text-sm text-neutral-200">Settings</p>
                            <div className="flex flex-col gap-6 h-full">
                                {/* Toggle Visibility for Ratings */}
                                {editableRatings.map((rating) => (
                                    <div
                                        key={rating.platform}
                                        className="flex j items-center justify-between gap-20"
                                    >
                                        <span className="font-medium">
                                            {capitalizeFirstLetter(
                                                rating.platform
                                            )}
                                        </span>
                                        <Switch
                                            checked={rating.show}
                                            onChange={() =>
                                                handleToggle(rating.platform)
                                            }
                                            height={22}
                                            width={48}
                                            checkedIcon={false}
                                            uncheckedIcon={false}
                                            onColor="#f36740"
                                        />
                                    </div>
                                ))}
                            </div>
                        </BentoGridItem>
                    </div>
                </div>
                {/* Platforms Section */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-semibold">Platforms</h1>
                    <BentoGrid className="grid-cols-3 gap-5">
                        {/* Display Ratings for Platforms */}
                        {editableRatings.map((rating) => (
                            <BentoGridItem
                                key={rating.platform}
                                className={`bg-tnc-gray p-4 border ${
                                    rating.show ? "opacity-100" : "opacity-40"
                                }`}
                            >
                                <div className="w-full flex flex-col gap-2">
                                    <div className="flex gap-2 items-center">
                                        <div className="relative w-9 h-9 border-[1px] rounded-xl bg-white">
                                            <Image
                                                src={
                                                    ratingImagesMap[
                                                        rating.platform?.toLowerCase()
                                                    ] ||
                                                    "/images/user-avatar.png"
                                                }
                                                alt=""
                                                className="absolute p-1.5"
                                                fill
                                                sizes="100"
                                            />
                                        </div>
                                        <h1 className="font-medium text-lg">
                                            {capitalizeFirstLetter(
                                                rating.platform
                                            )}
                                        </h1>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="group">
                                            <div
                                                className={`relative flex items-center justify-between hover:bg-[#e9e9e9] focus-within:bg-[#e9e9e9] rounded-[12px] transition-all`}
                                            >
                                                <input
                                                    type="text"
                                                    className="peer w-full text-lg leading-none font-medium bg-transparent outline-none py-1 focus-within:px-2 hover:px-2 rounded-[12px] transition-all"
                                                    value={rating.username}
                                                    onChange={(e) =>
                                                        handleUsernameChange(
                                                            rating.platform,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="enter-username"
                                                />
                                                <Pencil
                                                    className="absolute right-0 peer-hover:hidden peer-focus-within:hidden transition-all"
                                                    width={16}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </BentoGridItem>
                        ))}
                    </BentoGrid>
                </div>
            </div>
            <button
                className="cursor-pointer flex items-center gap-2 bg-tnc-orange text-white rounded-[24px] px-10 py-3 w-fit mx-auto mt-8"
                onClick={handleSubmit}
            >
                {editLoading ? "Saving..." : "Save Profile"}
            </button>
            <Toaster position="top-right" />
        </div>
    );
}
