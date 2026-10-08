import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  // Check if a token exists in localStorage
  // You can change 'token' to whatever key you use when saving the login token
  const isAuthenticated = localStorage.getItem('access_token');

  // If there's no token, redirect them to the login page immediately
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If they are authenticated, render the child routes (which will be the AdminLayout)
  return <Outlet />;
};

export default AuthGuard;
