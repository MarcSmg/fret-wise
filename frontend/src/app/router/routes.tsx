import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { HomePage } from "../../features/chord/pages/HomePage";
import { FavoritesPage } from "../../features/favorites/pages/FavoritesPage";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { SignupPage } from "../../features/auth/pages/SignupPage";
import { ProfilePage } from "../../features/user/pages/ProfilePage";

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/favorites", element: <FavoritesPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <SignupPage /> },
            { path: "/profile", element: <ProfilePage /> }
        ],
    }
]);