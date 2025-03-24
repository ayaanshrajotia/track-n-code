/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import MongoConnection from "@/server/db/MongoDB";
import UserModel from "@/server/models/User.model";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await MongoConnection.connect();

                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Email and password are required.");
                    }

                    const user = await UserModel.findOne({
                        email: credentials.email,
                    });

                    if (!user) {
                        throw new Error("Invalid email or password.");
                    }

                    // Check if user registered via OAuth (GitHub/Google)
                    if (!user.password) {
                        throw new Error(
                            "This email is linked to a social login. Please sign in with Google or GitHub."
                        );
                    }

                    const isPasswordMatch = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (!isPasswordMatch) {
                        throw new Error("Invalid email or password.");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.full_name,
                    };
                } catch (error: any) {
                    console.error("Authorization error:", error.message);
                    throw new Error(error.message);
                }
            },
        }),
    ],
    pages: {
        signIn: "/signin",
        error: "/signin",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                await MongoConnection.connect();
                const existingUser = await UserModel.findOne({
                    email: user.email,
                });

                if (existingUser) {
                    if (existingUser.provider !== account?.provider) {
                        console.error(
                            `User already signed up using ${existingUser.provider}.`
                        );
                        toast.error(
                            `User already signed up using ${existingUser.provider}.`
                        );
                        return false; // Instead of throwing an error
                    }

                    // If the user exists but has an empty ratings array, update it
                    if (
                        !existingUser.ratings ||
                        existingUser.ratings.length === 0
                    ) {
                        await UserModel.updateOne(
                            { email: user.email },
                            {
                                $set: {
                                    ratings: [
                                        {
                                            platform: "leetcode",
                                            username: "",
                                            show: false,
                                        },
                                        {
                                            platform: "codechef",
                                            username: "",
                                            show: false,
                                        },
                                        {
                                            platform: "codeforces",
                                            username: "",
                                            show: false,
                                        },
                                        {
                                            platform: "geeksforgeeks",
                                            username: "",
                                            show: false,
                                        },
                                        {
                                            platform: "atcoder",
                                            username: "",
                                            show: false,
                                        },
                                    ],
                                },
                            }
                        );
                    }
                } else {
                    // Only create a new user for OAuth logins (GitHub/Google)
                    if (account?.provider !== "credentials") {
                        await UserModel.create({
                            email: user.email,
                            full_name: user.name,
                            username: user?.email?.split("@")[0],
                            provider: account?.provider, // Ensure provider is always set correctly
                            ratings: [
                                {
                                    platform: "leetcode",
                                    username: "",
                                    show: false,
                                },
                                {
                                    platform: "codechef",
                                    username: "",
                                    show: false,
                                },
                                {
                                    platform: "codeforces",
                                    username: "",
                                    show: false,
                                },
                                {
                                    platform: "geeksforgeeks",
                                    username: "",
                                    show: false,
                                },
                                {
                                    platform: "atcoder",
                                    username: "",
                                    show: false,
                                },
                            ],
                        });
                    } else {
                        throw new Error(
                            "Email and password are required for credential login."
                        );
                    }
                }

                return true;
            } catch (error: any) {
                console.error("Error in signIn callback:", error);
                return false; // Return false instead of throwing error
            }
        },
    },
};
