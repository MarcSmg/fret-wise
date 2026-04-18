import { Navigate } from "react-router-dom";
import { userAuth as useAuth } from "../../context/AuthContext";

export const LandingPage = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/app" replace />;
    }
  return (
    <div>LandingPage</div>
  )
}
