import { Navigate } from "react-router-dom";
import { useAuth as useAuth } from "../../context/AuthContext";

export const LandingPage = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }
  return (
    <p>
      Landing Page - Welcome to Chord Opus! Please log in or sign up to continue.
    </p>
  )
}
