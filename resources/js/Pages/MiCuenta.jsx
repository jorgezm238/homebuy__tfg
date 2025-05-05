// resources/js/pages/MiCuenta.jsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/micuenta.css';

export default function MiCuenta() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        await api.get('/sanctum/csrf-cookie');
        const res = await api.get('/api/user');
        setUsuario(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) {
    return <div className="profile-container"><p>Cargando…</p></div>;
  }
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Hola, {usuario.nombre}</h2>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Tipo de cuenta:</strong> {usuario.tipo}</p>
      </div>
    </div>
  );
}
