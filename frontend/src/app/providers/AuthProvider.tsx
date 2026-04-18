import { useEffect, useState } from "react"
import { AuthContext, type User } from "../../context/AuthContext";

type AuthProviderProps = {
    children: React.ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {

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
                // API call
                // const user = api.me()
                
                const user = null;
                
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
            login,
            logout
        }}
        >
            { !loading && children}
        </AuthContext.Provider>
    )
}