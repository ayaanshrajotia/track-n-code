import React from "react";

export default function Container({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`bg-white flex items-center gap-1 p-2 rounded-[20px] border ${className}`}
        >
            {children}
        </div>
    );
}
