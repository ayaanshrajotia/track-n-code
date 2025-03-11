import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/server/models/User.model";
import MongoConnection from "@/server/db/MongoDB";

export async function POST(req: NextRequest) {
    try {
        const { full_name, username, email, password } = await req.json();
        console.log(full_name, username, email, password);
        await MongoConnection.connect();

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new UserModel({
            full_name,
            username,
            email,
            provider: "credentials",
            password: hashedPassword,
        });
        await newUser.save();

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
