
// resources/js/components/RegisterForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api';
//import '../css/auth.css'; // tu CSS de estilos comunes

export default function RegisterForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (password !== confirmacion) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      // 1) CSRF cookie
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true
      });

      // 2) registro
      await api.post('/register', {
        nombre,
        email,
        password,
        password_confirmation: confirmacion
      });

      // 3) al login
      nav('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse.');
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h2>Regístrate</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Repite contraseña"
            value={confirmacion}
            onChange={e => setConfirmacion(e.target.value)}
            required
          />
          <button type="submit">Registrarse</button>
        </form>
        <Link to="/login" className="auth-link">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </div>
    </div>
  );
}