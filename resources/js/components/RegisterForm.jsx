import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function RegisterForm(){
  const [nombre, setNombre]         = useState('');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [confirmacion, setConfirm]  = useState('');
  const [error, setError]           = useState('');
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if(password !== confirmacion){
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      await api.get('/sanctum/csrf-cookie');
      await api.post('/register', {
        nombre,
        email,
        password,
        password_confirmation: confirmacion
      });
      nav('/login');
    } catch(err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Regístrate</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Tu nombre"
        value={nombre}
        onChange={e=>setNombre(e.target.value)}
        required
      />
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
      <input
        type="password"
        placeholder="Repite la contraseña"
        value={confirmacion}
        onChange={e=>setConfirm(e.target.value)}
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}
