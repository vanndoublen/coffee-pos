"use client";

import Image from "next/image"
import { ThemeToggleButton } from "./theme-toggle-button"
import { useLogoutAll, useMe } from "@/features/auth/auth.hooks";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { RoleName, UserResponse } from "@/features/auth/auth.types";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { authApi } from "@/features/auth/auth.api";
import { useRouter } from "next/navigation";
import { HomeNavigation } from "./home-navigation";

const ROLE_PRIORITY: RoleName[] = [
    "ROLE_ADMIN",
    "ROLE_MANAGER",
    "ROLE_CASHIER",
];

export const MainHeader = () => {
    const router = useRouter();
    const { data } = useMe();
    const logoutAllMutation = useLogoutAll();

    // TODO: display all roles
    type DisplayRole = "ADMIN" | "MANAGER" | "CASHIER";

    const getOneRole = (data?: UserResponse): DisplayRole | "" => {
        if (!data?.roles?.length) return "";

        for (const priority of ROLE_PRIORITY) {
            if (data.roles.includes(priority)) {
                return priority.replace("ROLE_", "") as DisplayRole;
            }
        }

        return "";
    };

    const logoutAll = async () => {
        await logoutAllMutation.mutateAsync(undefined, {
            onSuccess: (data) => {
                router.push("/login")
            }
        })
    };


    return (
        <div className="h-14 shrink-0 flex items-center justify-between px-4 ">
            <div className="flex gap-x-1 items-center">
                <Image src="/logo.svg" alt="logo" width={20} height={20} />
                <h1 className="font-bold text-base">COFFEE POS</h1>
            </div>
            <div>
                <HomeNavigation />
            </div>
            <div className="flex gap-x-3 items-center border-t bg-secondary px-4 py-2 rounded-full shadow-xs">
                <ThemeToggleButton />
                <Separator orientation="vertical" className="h-6! " />
                <Badge variant="outline" >Role: {getOneRole(data)}</Badge>
                <Separator orientation="vertical" className="h-6! " />
                <Button
                    onClick={logoutAll}
                    variant="destructive"
                    size="sm"
                    className="shadow-xs h-6 border"
                >
                    <span className="">Logout All</span>
                </Button>

            </div>
        </div>
    )
}