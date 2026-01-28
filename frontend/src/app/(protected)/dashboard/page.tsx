"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/features/auth/auth.api";
import type { UserResponse} from "@/features/auth/auth.types";
import { Button } from "@/components/ui/button";
import { useMe } from "@/features/auth/auth.hooks";

export const Page = () => {
  const router = useRouter();

  const {data: user, isLoading} = useMe(); 

  const logoutAll = async () => {
    try {
      await authApi.logoutAll();
    } finally {
      router.replace("/login");
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {user ? (
        <div className="space-y-2">
          <p>
            Logged in as: <b>{user.username}</b>
          </p>

          <p>
            Roles: <b>{user.roles?.join(", ")}</b>
          </p>

          <Button variant="destructive" onClick={logoutAll}>
            Logout All
          </Button>
        </div>
      ) : (
        <p>No user loaded</p>
      )}
    </div>
  );
}

export default Page;