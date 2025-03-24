import { NextRequest, NextResponse } from "next/server";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.util";
import User from "@/server/models/User.model";

export const editDashboardHandler = async (req: NextRequest) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = req.user;

    try {
        const formData = await req.formData();
        console.log(formData);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const image: File = formData.get("profile_image") as any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log("IMAGE", image);

        if (
            data.is_image_changed === "true" ||
            data.is_image_changed === true
        ) {
            if (!image) {
                return NextResponse.json(
                    { error: "Image is required" },
                    { status: 400 }
                );
            }

            // checking size of image
            if (image.size > 3 * 1024 * 1024) {
                return NextResponse.json(
                    { error: "Image size should be less than 3MB" },
                    { status: 400 }
                );
            }

            // Upload image to Cloudinary
            const cloudinaryResponse = await uploadOnCloudinary(
                image,
                "TrackNCode/profile_images"
            );

            if (!cloudinaryResponse) {
                return NextResponse.json(
                    { error: "Failed to upload image" },
                    { status: 500 }
                );
            }
            // delete previous image from Cloudinary if exists
            // eslint-disable-next-line @typescript-eslint/no-explicit-any

            if (user.profile_image.public_id) {
                await deleteFromCloudinary(user.profile_image.public_id);
            }

            data.image = {
                url: cloudinaryResponse.url,
                public_id: cloudinaryResponse.public_id,
                secure_url: cloudinaryResponse.secure_url,
            };
            user.profile_image = data.image;
        }

        // Update the dashboard
        if (!data.full_name || !data.username) {
            return NextResponse.json(
                { error: "Full Name is required" },
                { status: 400 }
            );
        }

        user.full_name = data.full_name;
        user.ratings =
            data.ratings && typeof data.ratings === "string"
                ? JSON.parse(data.ratings)
                : [];

        console.log("data", data.ratings);
        console.log("user", user.ratings);
        // console.log("USER:", user);

        await User.findByIdAndUpdate(
            user._id,
            {
                full_name: user.full_name,
                profile_image: user.profile_image,
                ratings: user.ratings,
            },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            result: {
                full_name: user.full_name,
                email: user.email,
                username: user.username,
                profile_image: user.profile_image || {},
                ratings: user.ratings || [],
            },
            message: "Dashboard updated successfully",
            error: null,
        });
    } catch (error) {
        console.error("Error in editDashboardHandler: ", error);
        return NextResponse.json(
            {
                success: false,
                result: null,
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
};

export const getDashboardHandler = async (req: NextRequest) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = req.user;

    return NextResponse.json({
        success: true,
        result: {
            full_name: user.full_name,
            email: user.email,
            username: user.username,
            profile_image: user.profile_image,
            ratings: user.ratings || [],
        },
        error: null,
    });
};
