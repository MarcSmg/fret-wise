import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { ChordSearchPage } from "../../features/chord/pages/ChordSearchPage";
import { FavoritesPage } from "../../features/favorites/pages/FavoritesPage";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { SignupPage } from "../../features/auth/pages/SignupPage";
import { ProfilePage } from "../../features/user/pages/ProfilePage";
import { HomePage } from "../../features/chord/pages/HomePage";
import { LandingPage } from "../../pages/landing/LandingPage";

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { path: "/", element: <LandingPage/>},
            { path: "/home", element: <HomePage /> },
            { path: "/search", element: <ChordSearchPage/>},
            { path: "/favorites", element: <FavoritesPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <SignupPage /> },
            { path: "/profile", element: <ProfilePage /> }
        ],
    }
]);