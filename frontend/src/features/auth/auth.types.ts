export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
}

export interface UserResponse {
    id: number;
    username: string;
    roles: RoleName[];
}

export type Role = {
  id: number;
  roleName: RoleName;
};

export type RoleName = "ROLE_CASHIER" | "ROLE_MANAGER" | "ROLE_ADMIN" 