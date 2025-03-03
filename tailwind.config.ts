import type { Config } from "tailwindcss";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const flattenColorPalette =
    require("tailwindcss/lib/util/flattenColorPalette").default;

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "tnc-gray": "#F5F5F5",
                "tnc-dark-gray": "#989898",
                // "tnc-signature": "#caec46",
                "tnc-signature": "#d7fc68",
                "tnc-orange": "#F15428",
                "tnc-black": "#212121",
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                "dm-sans": ["DM Sans", "sans-serif"],
            },
        },
    },
    plugins: [addVariablesForColors],
} satisfies Config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
    const allColors = flattenColorPalette(theme("colors"));
    const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}
