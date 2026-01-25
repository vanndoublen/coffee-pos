// src/lib/http/client.ts

import { authStore } from "@/features/auth/auth.store";

export type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown; // allow passing objects, we JSON stringify
  retry?: boolean; // internal retry flag
};

export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function parseJsonSafely(res: Response) {
  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function refreshAccessToken(): Promise<string | null> {
  // Important: use relative /api because your rewrite proxies to Spring
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) return null;

  const data = await res.json();

  // Adjust field name to match your backend response
  const newToken = data?.accessToken;
  if (typeof newToken === "string" && newToken.length > 0) {
    authStore.setAccessToken(newToken);
    return newToken;
  }

  return null;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { body, headers, retry = true, ...rest } = options;

  const token = authStore.getAccessToken();

  const res = await fetch(path.startsWith("/api") ? path : `/api${path}`, {
    ...rest,
    method: rest.method ?? "GET",
    credentials: "include", // ✅ so refresh cookie is sent
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers ?? {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // ✅ auto refresh & retry once
  if (res.status === 401 && retry) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return apiFetch<T>(path, { ...options, retry: false });
    }
  }

  if (!res.ok) {
    const data = await parseJsonSafely(res);
    const message =
      (data && typeof data === "object" && "message" in data && String((data as any).message)) ||
      res.statusText ||
      "Request failed";
    throw new ApiError(message, res.status, data);
  }

  // If backend returns no content
  if (res.status === 204) {
    return null as T;
  }

  const data = (await parseJsonSafely(res)) as T;
  return data;
}
