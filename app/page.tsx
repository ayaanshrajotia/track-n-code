import { redirect } from "next/navigation";

export default function Page() {
    redirect("/dashboard"); // Redirects on the server before rendering

    return null; // No need to render anything
}
