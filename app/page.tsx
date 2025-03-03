"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();

    // Redirect to "/home" when the component mounts
    useEffect(() => {
        router.push("/dashboard");
    }, [router]);

    return (
        <div>
            <h1>Track n Code</h1>
        </div>
    );
}
