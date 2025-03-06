import { cn } from "@/libs/utils";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div className={cn("grid gap-3 auto-rows-min", className)}>
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "relative rounded-[24px] transition duration-200 shadow-input dark:shadow-none p-4 px-5 bg-tnc-gray",
                className
            )}
        >
            {/* <GlowingEffect
                borderWidth={1.5}
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
            /> */}
            {children}
        </div>
    );
};