// resources/js/components/LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api';

export default function LoginForm() {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      // 1) CSRF cookie ENRUTA WEB (no api)
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true
      });

      // 2) login CORRECTO en /api/login
      const res = await api.post('/login', { email, password });

      localStorage.setItem('token', res.data.token);
      nav('/');

    } catch (err) {
      setError(err.response?.data?.mensaje || 'Credenciales inválidas');
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
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
          <button type="submit">Iniciar Sesión</button>
        </form>

        <Link to="/register" className="auth-link">
          ¿No tienes cuenta? Regístrate aquí
        </Link>
      </div>
    </div>
  );
}
