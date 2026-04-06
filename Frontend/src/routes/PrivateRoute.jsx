import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const storedToken = localStorage.getItem('token');

  if (loading) {
    return <p className="rounded-lg border border-white/10 bg-white/5 p-4 text-slate-300">Checking authentication...</p>;
  }

  if (!isAuthenticated && !storedToken) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default PrivateRoute;
