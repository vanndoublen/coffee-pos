"use client";

import { useRouter } from "next/navigation";
import { useMe } from "../auth.hooks";
import { useEffect } from "react";

export const AuthGaurd = ({children} : {children: React.ReactNode}) => {
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
    return children;
}