// resources/js/pages/CambiarPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/cambiar-password.css';

export default function CambiarPassword() {
  const [form, setForm]       = useState({
    current_password: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Autoocultar mensajes
  React.useEffect(() => {
    if (!msg && !errorMsg) return;
    const timer = setTimeout(() => {
      setMsg('');
      setErrorMsg('');
      // tras éxito, volvemos a Mi Cuenta
      if (msg) navigate('/mi-cuenta');
    }, 3000);
    return () => clearTimeout(timer);
  }, [msg, errorMsg, navigate]);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setErrorMsg('');
    try {
      await api.put('/user/password', form);
      setMsg('✅ Contraseña cambiada correctamente.');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || '❌ Error al cambiar contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cambiar-password-page">
      <h2>Cambiar Contraseña</h2>

      {msg && <div className="cp-alert cp-success">{msg}</div>}
      {errorMsg && <div className="cp-alert cp-error">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="cp-form">
        <label htmlFor="current_password">Contraseña actual</label>
        <input
          id="current_password"
          name="current_password"
          type="password"
          value={form.current_password}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Nueva contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="password_confirmation">Confirmar nueva contraseña</label>
        <input
          id="password_confirmation"
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
