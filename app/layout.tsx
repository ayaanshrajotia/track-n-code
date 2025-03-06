import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";

const dm_sans = DM_Sans({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Track n Code",
    description: "Track n Code is a platform to track your coding progress",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={dm_sans.className}>
            <body className={`relative min-h-screen h-full w-full`}>
                {children}
            </body>
        </html>
    );
}
