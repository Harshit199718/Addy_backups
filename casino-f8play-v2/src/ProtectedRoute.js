import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({isLoggedIn}) {

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
