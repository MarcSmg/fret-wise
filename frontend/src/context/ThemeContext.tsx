import { createContext, useContext } from "react";

interface ThemeProviderType {
    theme: string,
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeProviderType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error('useTheme must be used within a ThemeProvider');
    return context;
}