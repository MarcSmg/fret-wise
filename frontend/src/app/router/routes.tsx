import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { ChordSearchPage } from "../../features/chord/pages/ChordSearchPage";
import { FavoritesPage } from "../../features/favorites/pages/FavoritesPage";
import { AuthPage } from "../../features/auth/pages/AuthPage";
import { ProfilePage } from "../../features/user/pages/ProfilePage";
import { HomePage } from "../../features/chord/pages/HomePage";
// import { LandingPage } from "../../pages/landing/LandingPage";
import { AuthLayout } from "../layout/AuthLayout";
import { LandingLayout } from "../layout/LandingLayout";

export const router = createBrowserRouter([
    {
        element: <LandingLayout/>,
        children: [
            { path: "/", element: <AuthPage initialMode="login" />},
        ]
    },
    {
        element: <AuthLayout/>,
        children: [
            { path: "/login", element: <AuthPage initialMode="login" /> },
            { path: "/signup", element: <AuthPage initialMode="signup" /> },
        ]
    },
    {
        element: <AppLayout />,
        children: [
            { path: "/home", element: <HomePage /> },
            { path: "/search", element: <ChordSearchPage/>},
            { path: "/favorites", element: <FavoritesPage /> },
            { path: "/profile", element: <ProfilePage /> }
        ],
    },
]);