import { createContext, useContext } from "react";

export type User = {
    id: string;
    email: string;
} | null;

export type AuthContextType = {
    user: User;
    isAuthenticated: boolean;
    login: (user: NonNullable<User>) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const userAuth = () => {
    const context = useContext(AuthContext);
    if (!context) 
        throw new Error("useAuth must be used within AuthProvider ")
    return context;
}