// resources/js/components/AdminRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from '../services/api';

export default function RutaAdmin() {
  const [loading, setLoading]   = useState(true);
  const [isAdmin, setIsAdmin]   = useState(false);

  useEffect(() => {
    api.get('/user')
      .then(({ data }) => setIsAdmin(data.tipo === 'admin'))
      .catch(() => setIsAdmin(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    // Aquí podrías devolver un spinner o null
    return null;
  }

  return isAdmin
    ? <Outlet />
    : <Navigate to="/" replace />;
}
