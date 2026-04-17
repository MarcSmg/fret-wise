import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface ThemeProviderType {
    theme: string,
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeProviderType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {

    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved;
        return window.matchMedia("prefers-color-theme: dark").matches ? "dark" : "light";
    })

    useEffect(() => {
        const root = window.document.documentElement;
        theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error('useTheme must be used within a ThemeProvider');
    return context;
}