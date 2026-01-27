import Image from "next/image"
import { ThemeToggleButton } from "./theme-toggle-button"

export const RootHeader = () => {
    return (
        <div className="h-full w-full flex items-center justify-between px-34 py-3 border-b-2">
            <div className="flex gap-x-4">
                <Image src="/logo.svg" alt="logo" width={20} height={20} />
                <h1 className="font-bold text-lg">Coffee Pos</h1>
            </div>
            <ThemeToggleButton />
        </div>
    )
}