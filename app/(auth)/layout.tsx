import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-screen public-background-gradient ">
            {children}
        </div>
    );
}
