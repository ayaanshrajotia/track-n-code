/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { BackgroundLines } from "@/app/components/ui/background-lines";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SignUpPage() {
    const [userDetails, setUserDetails] = useState({
        email: "",
        oldPassword: "",
        newPassword: "",
    });

    const handlePasswordChange = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            if (
                !userDetails.email ||
                !userDetails.oldPassword ||
                !userDetails.newPassword
            ) {
                toast.error("Please provide all fields");
                return;
            }

            const res = await axios.post("/api/forgot-password", userDetails);
            toast.success("Password changed successfully");
            console.log(res);
        } catch (error: any) {
            console.log("Password change error:", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <BackgroundLines className="public-background-gradient min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
            <div className="z-20 w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col gap-4 justify-center border rounded-[24px] p-6 px-8 bg-white shadow-lg">
                <h1 className="text-4xl font-bold text-center mb-3">
                    Change Password
                </h1>
                <form
                    className="flex flex-col gap-5"
                    onSubmit={handlePasswordChange}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-tnc-gray rounded-[24px] px-5 py-3 outline-none text-sm sm:text-base"
                        onChange={(e) =>
                            setUserDetails({
                                ...userDetails,
                                email: e.target.value,
                            })
                        }
                        value={userDetails.email}
                    />
                    <input
                        type="password"
                        placeholder="Old Password"
                        className="bg-tnc-gray rounded-[24px] px-5 py-3 outline-none text-sm sm:text-base"
                        onChange={(e) =>
                            setUserDetails({
                                ...userDetails,
                                oldPassword: e.target.value,
                            })
                        }
                        value={userDetails.oldPassword}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        className="bg-tnc-gray rounded-[24px] px-5 py-3 text-sm outline-none sm:text-base"
                        onChange={(e) =>
                            setUserDetails({
                                ...userDetails,
                                newPassword: e.target.value,
                            })
                        }
                        value={userDetails.newPassword}
                    />

                    <button
                        className="bg-tnc-orange hover:bg-orange-600 transition-all text-white rounded-[24px] py-3 px-4 font-semibold flex justify-center items-center text-sm sm:text-base"
                        type="submit"
                    >
                        Change Password
                    </button>
                </form>
                <span className="text-xs sm:text-sm text-center">
                    Remember your password?{" "}
                    <Link
                        href={"/signin"}
                        className="text-tnc-orange hover:underline"
                    >
                        Log in
                    </Link>
                </span>
            </div>
        </BackgroundLines>
    );
}
