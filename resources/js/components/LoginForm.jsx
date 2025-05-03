import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function LoginForm(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await api.get('/sanctum/csrf-cookie');
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      nav('/');
    } catch(err) {
      setError(err.response?.data?.message || 'Credenciales inválidas');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        required
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
