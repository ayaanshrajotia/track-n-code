import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";

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
        <html lang="en">
            <body className={`relative min-h-screen h-full w-full`}>
                <StoreProvider>{children}</StoreProvider>
                <Toaster />
            </body>
        </html>
    );
}
