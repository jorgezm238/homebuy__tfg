// resources/js/components/RutaPrivada.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RutaPrivada() {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // guardamos la ruta a la que intentaba entrar
    return <Navigate to="/register" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
