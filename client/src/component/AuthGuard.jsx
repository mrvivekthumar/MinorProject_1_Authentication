import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function AuthGuard({ children, isAuth, redirectPath }) {
    if (!isAuth) {
        // Show toast only when directly navigating to a protected route
        toast.error("Please login to access this page");
        return <Navigate to={redirectPath} replace />;
    }
    return children;
}

export default AuthGuard;