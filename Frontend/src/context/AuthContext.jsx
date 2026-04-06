import React, { createContext, useContext, useMemo, useState } from 'react';
import { loginAdmin, setupAdmin } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading] = useState(false);

  const login = async (credentials) => {
    const data = await loginAdmin(credentials);
    const nextToken = data?.token;

    if (!nextToken) {
      throw new Error('Token not received from server');
    }

    localStorage.setItem('token', nextToken);
    setToken(nextToken);
  };

  const setup = async (credentials) => {
    const data = await setupAdmin(credentials);
    const nextToken = data?.token;

    if (!nextToken) {
      throw new Error('Token not received from server');
    }

    localStorage.setItem('token', nextToken);
    setToken(nextToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const value = useMemo(
    () => ({
      token,
      loading,
      isAuthenticated: Boolean(token),
      login,
      setup,
      logout,
    }),
    [token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
