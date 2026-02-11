import { Input } from "@/components/ui/input"
import { BiSearch } from "react-icons/bi";

export const MenuItemHeader = () => {
    return (
        <div className="sticky top-0 z-50 flex items-center gap-2 px-4 py-2 bg-secondary/85 backdrop-blur-md">
            <div className="relative w-2/5">
                <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                    className="pl-9 border-0! shadow-2xl"
                    placeholder="Search by name"
                />
            </div>
        </div>
    )
}