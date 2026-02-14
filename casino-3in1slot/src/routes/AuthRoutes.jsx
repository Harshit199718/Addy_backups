import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function AuthRoutes({isAuth, children}) {
    const searchParams = new URLSearchParams(location.search);
    const token_id = searchParams.get("token_id");
    
    if (isAuth && !token_id) {
        return <Navigate to="/" />;
    }
  return children?children:<Outlet />
}

export default AuthRoutes