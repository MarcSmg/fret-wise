import { useEffect, useState } from "react"
import { AuthContext, type User } from "../../context/AuthContext";
import {
    authApi

} from "@/api/auth";
type AuthProviderProps = {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    function login(userData: NonNullable<User>) {
        setUser(userData);
    }

    function logout() {
        setUser(null);
    }

    useEffect(() => {
        async function init() {
            try {
                const user = await authApi.me()

                setUser(user);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                login,
                logout
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    )
}