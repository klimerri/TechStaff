import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const userData = localStorage.getItem("user");
    const isAuthenticated = userData ? true : false;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

