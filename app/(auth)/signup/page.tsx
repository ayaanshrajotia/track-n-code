/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { BackgroundLines } from "@/app/components/ui/background-lines";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { z } from "zod";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState({
        full_name: "",
        username: "",
        email: "",
        password: "",
    });

    const signUpSchema = z.object({});

    const handleGithubSignIn = async () => {
        try {
            const res = await signIn("github", {
                callbackUrl: "/dashboard",
            });
            if (res?.error) throw new Error(res.error);
        } catch (error: any) {
            console.error(error);
            toast.error("GitHub sign-in failed. Please try again.");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const res = await signIn("google", { callbackUrl: "/dashboard" });
            if (res?.error) throw new Error(res.error);
        } catch (error: any) {
            console.error(error);
            toast.error("Google sign-in failed. Please try again.");
        }
    };

    const handleCredentialsSignUp = async (e: any) => {
        e.preventDefault();

        const result = signUpSchema.safeParse(userDetails);
        if (!result.success) {
            toast.error(result.error.errors[0].message);
            return;
        }

        try {
            await axios.post("/api/auth/signup", userDetails);
            toast.success("Account created!");
            router.push("/signin");
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Signup failed.");
        }
    };

    return (
        <div className="public-background-gradient min-h-screen flex items-center justify-center px-4 sm:px-0">
            <div className="z-20 w-full h-screen flex flex-col md:flex-row justify-center overflow-hidden">
                {/* Left side - Form */}
                <BackgroundLines className="relative w-full md:w-1/2 flex flex-col justify-center items-center p-6 px-8">
                    <div className="z-20 max-w-[500px] w-full flex flex-col gap-3">
                        <h1 className="text-4xl font-bold text-center mb-3">
                            Sign Up
                        </h1>
                        <form className="flex flex-col gap-5">
                            <input
                                type="text"
                                placeholder="Name"
                                className="bg-tnc-gray rounded-[24px] px-5 py-3 outline-none text-sm sm:text-base"
                                onChange={(e) =>
                                    setUserDetails({
                                        ...userDetails,
                                        full_name: e.target.value,
                                    })
                                }
                                value={userDetails.full_name}
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                className="bg-tnc-gray rounded-[24px] px-5 py-3 outline-none text-sm sm:text-base"
                                onChange={(e) =>
                                    setUserDetails({
                                        ...userDetails,
                                        username: e.target.value,
                                    })
                                }
                                value={userDetails.username}
                            />
                            <input
                                type="text"
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
                                placeholder="Password"
                                className="bg-tnc-gray rounded-[24px] px-5 py-3 outline-none text-sm sm:text-base"
                                onChange={(e) =>
                                    setUserDetails({
                                        ...userDetails,
                                        password: e.target.value,
                                    })
                                }
                                value={userDetails.password}
                            />
                            <button
                                className="bg-tnc-orange hover:bg-orange-600 transition-all text-white rounded-[24px] py-3 px-4 font-semibold flex justify-center items-center text-sm sm:text-base"
                                type="button"
                                onClick={handleCredentialsSignUp}
                            >
                                Create Account
                            </button>
                            <div className="relative w-full h-[1px] bg-stone-300 my-3">
                                <span className="absolute bg-white -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 text-xs sm:text-sm px-4 text-stone-500">
                                    or log in with
                                </span>
                            </div>
                            <button
                                className="border bg-white rounded-[24px] py-3 px-4 font-medium flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-tnc-gray transition-all"
                                onClick={handleGithubSignIn}
                                type="button"
                            >
                                <div className="relative w-5 h-5">
                                    <Image
                                        src="/images/icons/github.png"
                                        alt="Github"
                                        fill
                                        className="absolute"
                                    />
                                </div>
                                Github
                            </button>
                            <button
                                className="border bg-white rounded-[24px] py-3 px-4 font-medium flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-tnc-gray transition-all"
                                onClick={handleGoogleSignIn}
                                type="button"
                            >
                                <div className="relative w-5 h-5">
                                    <Image
                                        src="/images/icons/google.png"
                                        alt="Google"
                                        fill
                                        className="absolute"
                                    />
                                </div>
                                Google
                            </button>
                        </form>
                        <span className="text-xs sm:text-sm text-center mt-4">
                            Already have an account?{" "}
                            <Link
                                href="/signin"
                                className="text-tnc-orange hover:underline"
                            >
                                Sign in
                            </Link>
                        </span>
                    </div>
                </BackgroundLines>
                {/* Right side - SVG Image */}
                <section className="w-full md:w-1/2 p-6 pl-0 hidden md:flex overflow-hidden">
                    <div className="bg-tnc-orange w-full h-full rounded-[24px]"></div>
                </section>
            </div>
        </div>
    );
}
