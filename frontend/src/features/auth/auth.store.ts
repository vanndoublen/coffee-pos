// src/features/auth/auth.store.ts

let accessToken: string | null = null;

export const authStore = {
  getAccessToken: () => accessToken,

  setAccessToken: (token: string | null) => {
    accessToken = token;
  },

  clear: () => {
    accessToken = null;
  },
};
