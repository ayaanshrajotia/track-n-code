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

// import { cn } from "@/libs/utils";
// import { GlowingEffect } from "./glowing-effect";

// export const BentoGrid = ({
//     className,
//     children,
// }: {
//     className?: string;
//     children?: React.ReactNode;
// }) => {
//     return (
//         <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[12rem] gap-4", className)}>
//             {children}
//         </div>
//     );
// };

// export const BentoGridItem = ({
//     className,
//     children,
// }: {
//     className?: string;
//     children: React.ReactNode;
// }) => {
//     return (
//         <div
//             className={cn(
//                 "relative h-full row-span-1 rounded-xl group/bento hover:shadow-lg transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-tnc-gray flex flex-col justify-between space-y-4 border",
//                 className
//             )}
//         >
//             <GlowingEffect
//                 spread={40}
//                 glow={true}
//                 disabled={false}
//                 proximity={64}
//                 inactiveZone={0.01}
//             />
//             <div className="relative flex h-full flex-col justify-between gap-4">
//                 {children}
//             </div>
//         </div>
//     );
// };
