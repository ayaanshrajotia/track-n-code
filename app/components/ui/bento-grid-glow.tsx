import { cn } from "@/app/utils/utils";
import { GlowingEffect } from "./glowing-effect";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div className={cn("grid gap-4 auto-rows-min", className)}>
            {children}
        </div>
    );
};

export const BentoGridItemGlow = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "box-shadow relative rounded-[28px] transition duration-200 shadow-input dark:shadow-none p-5 bg-tnc-gray",
                className
            )}
        >
            <GlowingEffect
                borderWidth={1.7}
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
            />
            {children}
        </div>
    );
};
