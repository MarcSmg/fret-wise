import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { ChordSearchPage } from "../../features/chord/pages/ChordSearchPage";
import { FavoritesPage } from "../../features/favorites/pages/FavoritesPage";
import { AuthPage } from "../../features/auth/pages/AuthPage";
import { ProfilePage } from "../../features/user/pages/ProfilePage";
import { HomePage } from "../../features/chord/pages/HomePage";
import { LandingPage } from "../../pages/landing/LandingPage";
import { AuthLayout } from "../layout/AuthLayout";
import { LandingLayout } from "../layout/LandingLayout";

export const router = createBrowserRouter([
    {
        element: <LandingLayout/>,
        children: [
            { path: "/", element: <LandingPage/>},
        ]

    },
    {
        element: <AuthLayout/>,
        children: [
            { path: "/login", element: <AuthPage /> },
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