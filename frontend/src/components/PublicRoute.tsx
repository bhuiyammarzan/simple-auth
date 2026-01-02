import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
