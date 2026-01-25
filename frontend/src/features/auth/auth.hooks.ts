import { useQuery } from "@tanstack/react-query"
import { authApi } from "./auth.api"

export const useMe = () => {
    return useQuery({
        queryKey: ["auth", "me"],
        queryFn: async () => {
            const res = await authApi.me();
            return res; 
        },
        retry: false,
        staleTime: 60_000,
    });
}