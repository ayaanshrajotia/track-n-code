import MongoConnection from "@/server/db/MongoDB";
import UserModel from "@/server/models/User.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, oldPassword, newPassword } = await req.json();
        console.log(email, oldPassword, newPassword);
        await MongoConnection.connect();

        if (!email || !oldPassword || !newPassword) {
            return NextResponse.json(
                { error: "Please provide all fields" },
                { status: 400 }
            );
        }

        // Check if user exists
        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 400 }
            );
        }

        // Check if old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { error: "Old password is incorrect" },
                { status: 400 }
            );
        }

        if (oldPassword === newPassword) {
            return NextResponse.json(
                { message: "New password cannot be the same as old password" },
                { status: 400 }
            );
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ message: "Password changed successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
