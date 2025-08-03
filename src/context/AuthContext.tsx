
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setUser(res.data.usuario);
      }).catch(() => {
        setToken('');
        setUser(null);
      });
    }
  }, [token]);

  const login = async (email, senha) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, senha });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.usuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
