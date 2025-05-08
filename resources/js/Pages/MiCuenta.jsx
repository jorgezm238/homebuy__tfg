// resources/js/pages/MiCuenta.jsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/micuenta.css';

export default function MiCuenta() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    api.get('/user')
      .then(({ data }) => setUsuario(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p className="profile-loading">Cargando…</p>;
  if (!token || !usuario) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Hola, {usuario.nombre}</h2>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Tipo:</strong> {usuario.tipo}</p>
      </div>
    </div>
  );
}
