import { BackgroundLines } from "@/app/components/ui/background-lines";
import Image from "next/image";
import Link from "next/link";

export default function page() {
    return (
        <BackgroundLines className="public-background-gradient h-screen w-full flex flex-col items-center justify-center">
            <div className="z-20 w-[500px] flex flex-col gap-4 justify-center border rounded-[24px] p-6 px-8 bg-white box-shadow">
                <h1 className="text-4xl font-bold text-center mb-3">Log in</h1>
                <form className="flex flex-col gap-5">
                    <input
                        type="text"
                        placeholder="Email"
                        className="bg-tnc-gray rounded-[24px] px-5 py-3 outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        className="bg-tnc-gray rounded-[24px] px-5 py-3"
                    />
                    <div className="flex justify-between items-center text-sm outline-none">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                value="remember"
                                className="rounded-[24px]"
                            />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <Link
                            href="/forgot-password"
                            className="text-stone-600"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Link
                        className="bg-tnc-orange rounded-[24px] text-white py-3 px-4 font-semibold flex justify-center items-center"
                        href={"/dashboard"}
                    >
                        Log in
                    </Link>
                    <div className="relative w-full h-[1px] bg-stone-300 my-3">
                        <span className="absolute bg-white -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 text-sm px-5 text-stone-500">
                            or login with
                        </span>
                    </div>
                    <button className="border bg-white rounded-[24px] py-3 px-4 font-medium flex items-center justify-center gap-2">
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
                    <button className="border bg-white rounded-[24px] py-3 px-4 font-medium flex items-center justify-center gap-2">
                        <div className="relative w-5 h-5">
                            <Image
                                src="/images/icons/google.png"
                                alt="Github"
                                fill
                                className="absolute"
                            />
                        </div>
                        Google
                    </button>
                </form>
                <span className="text-sm text-center">
                    Don&apos;t have an account?{" "}
                    <Link href={"/signup"} className="text-tnc-orange">
                        Sign up now
                    </Link>
                </span>
            </div>
        </BackgroundLines>
    );
}
