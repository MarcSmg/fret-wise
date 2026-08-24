import type { ApiUser } from "@/types/api";
import { createContext, useContext } from "react";

export type User = ApiUser | null;

export type AuthContextType = {
    user: User;
    isAuthenticated: boolean;
    loading: boolean;
    login: (user: NonNullable<User>) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) 
        throw new Error("useAuth must be used within AuthProvider ")
    return context;
}