import React, { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
    return (
        <h1 className="text-3xl font-extrabold mt-1.5 mb-24 underline underline-offset-[5px] decoration-tnc-orange">
            {children}
        </h1>
    );
}
