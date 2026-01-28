"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button"
import { WiMoonAltThirdQuarter } from "react-icons/wi";

export const ThemeToggleButton = () => {
    const { setTheme, theme } = useTheme();
    return (
        <>
            <Button
                size="icon"
                className="h-6 w-6"
                variant="outline"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                <WiMoonAltThirdQuarter />
            </Button>
        </>
    )
}