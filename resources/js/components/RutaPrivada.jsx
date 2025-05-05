import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';

export default function RutaPrivada({ children, requireAdmin = false }) {
  const [status, setStatus] = useState('loading'); // loading | ok | denied

  useEffect(() => {
    api.get('/sanctum/csrf-cookie')      // primero la cookie de Sanctum
      .then(()=> api.get('/api/user'))   // luego user
      .then(res => {
        const user = res.data;
        if (requireAdmin && user.tipo !== 'admin') {
          setStatus('denied');
        } else {
          setStatus('ok');
        }
      })
      .catch(()=> setStatus('denied'));
  }, []);

  if (status === 'loading') return null;
  if (status === 'denied')  return <Navigate to="/login" replace />;

  return children;
}
