// resources/js/pages/CambiarPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/cambiar-password.css';

export default function CambiarPassword() {
  const [form, setForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/user/password', form);
      alert('Contraseña cambiada.');
      navigate('/mi-cuenta');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message
                || 'Error al cambiar contraseña.';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cambiar-password-page">
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit} className="cp-form">
        <label>Contraseña actual</label>
        <input
          name="current_password"
          type="password"
          value={form.current_password}
          onChange={handleChange}
          required
        />
        <label>Nueva contraseña</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <label>Confirmar nueva contraseña</label>
        <input
          name="password_confirmation"
          type="password"
          value={form.password_confirmation}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Cambiando…' : 'Cambiar contraseña'}
        </button>
      </form>
    </div>
  );
}
