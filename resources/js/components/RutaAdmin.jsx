import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from '../services/api';

export default function RutaAdmin() {
  const [loading, setLoading]   = useState(true);
  const [isAdmin, setIsAdmin]   = useState(false);

  //comprobar si el usuario es admin al cargar el componente

  useEffect(() => {
    api.get('/user')
      .then(({ data }) => setIsAdmin(data.tipo === 'admin'))
      .catch(() => setIsAdmin(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return null;
  }

  return isAdmin
    ? <Outlet />
    : <Navigate to="/" replace />;
}
