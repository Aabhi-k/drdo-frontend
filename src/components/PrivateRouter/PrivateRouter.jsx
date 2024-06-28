import React from "react";
import { Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ( { isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  

export default PrivateRoute;
