"use client";

import { MainHeader } from "@/components/main-header";
import { useMe } from "@/features/auth/auth.hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { data, isLoading, isError } = useMe();

    useEffect(() => {
        if (!isLoading && isError) {
            router.replace("/login");
        }
    }, [isLoading, isError, router]);

    if (isLoading) {
        return <div>Loading...</div>; // or spinner
    }

    if (isError) {
        return null; // redirecting
    }

    return (
        <>
            <div className="flex flex-col h-svh overflow-hidden">
                <MainHeader />
                <div className="flex-1 min-h-0 p-2">
                    {children}
                </div>
            </div>
        </>
    );
}
