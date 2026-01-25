// src/features/auth/auth.api.ts


import { apiFetch } from "@/lib/http/client";
import { authStore } from "./auth.store";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserResponse,
} from "./auth.types";

export const authApi = {
  async register(data: RegisterRequest) {
    // adjust endpoint if yours differs
    return apiFetch<void>("/api/auth/register", {
      method: "POST",
      body: data,
    });
  },

  async login(data: LoginRequest) {
    const res = await apiFetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: data,
    });

    // backend returns accessToken in JSON
    authStore.setAccessToken(res.accessToken);
    return res;
  },

  async refresh() {
    const res = await apiFetch<AuthResponse>("/api/auth/refresh", {
      method: "POST",
    });

    authStore.setAccessToken(res.accessToken);
    return res;
  },

  async logoutAll() {
    await apiFetch<void>("/api/auth/logout-all", {
      method: "POST",
    });

    authStore.clear();
  },

  async me() {
    // adjust this endpoint to your real one (common: /api/users/me)
    return apiFetch<UserResponse>("/api/users/me", {
      method: "GET",
    });
  },
};
