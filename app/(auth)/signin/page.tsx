/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BackgroundLines } from "@/app/components/ui/background-lines";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    const handleCredentialsSignIn = async () => {
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                throw new Error(res.error);
            }

            router.push("/dashboard");
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="public-background-gradient min-h-screen flex items-center justify-center">
            <div className="z-20 w-full min-h-screen flex flex-col md:flex-row justify-center overflow-hidden">
                {/* Left side - Form */}
                <BackgroundLines className="relative w-full md:w-1/2 flex flex-col justify-center items-center p-6 px-8">
                    <div className="z-20 max-w-[500px] w-full flex flex-col gap-3">
                        <h1 className="text-4xl font-bold text-center mb-3">
                            Sign In
                        </h1>
                        <form className="flex flex-col gap-5">
                            <input
                                type="text"
                                placeholder="Email"
                                className="bg-tnc-gray rounded-[24px] px-5 py-3 outline-none text-sm sm:text-base"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="bg-tnc-gray rounded-[24px] px-5 py-3 text-sm sm:text-base outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <div className="flex justify-between items-center text-xs sm:text-sm">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="rounded-md"
                                    />
                                    <label htmlFor="remember">
                                        Remember me
                                    </label>
                                </div>
                                <Link
                                    href="/forgot-password"
                                    className="text-stone-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <button
                                className="bg-tnc-orange hover:bg-orange-600 transition-all text-white rounded-[24px] py-3 px-4 font-semibold flex justify-center items-center text-sm sm:text-base"
                                type="button"
                                onClick={handleCredentialsSignIn}
                            >
                                Sign in
                            </button>
                            <div className="relative w-full h-[1px] bg-stone-300 my-3">
                                <span className="absolute bg-white -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 text-xs sm:text-sm px-4 text-stone-500">
                                    or login with
                                </span>
                            </div>
                            <button
                                className="border bg-white rounded-[24px] py-3 px-4 font-medium flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-gray-100 transition-all"
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
                                className="border bg-white rounded-[24px] py-3 px-4 font-medium flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-gray-100 transition-all"
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
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/signup"
                                className="text-tnc-orange hover:underline"
                            >
                                Sign up now
                            </Link>
                        </span>
                    </div>
                </BackgroundLines>

                {/* Right side - SVG Image */}
                <section className="w-full md:w-1/2 p-6 pl-0 overflow-hidden hidden md:flex">
                    <div className="bg-tnc-orange w-full h-full rounded-[24px]"></div>
                </section>
            </div>
        </div>
    );
}
