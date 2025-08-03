
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ children, role }: any) => {
  const { user } = useAuth();
  if (!user) return <Navigate to='/login' />;
  if (role && user.role !== role) return <p>Sem permissão</p>;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
      </Routes>
    </AuthProvider>
  );
};

export default App;
