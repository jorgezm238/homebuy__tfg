// resources/js/pages/EditarPerfil.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../../css/editar-perfil.css';

export default function EditarPerfil() {
  const [form, setForm]         = useState({ nombre: '', email: '' });
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg]           = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Carga inicial de los valores del perfil
  useEffect(() => {
    api.get('/user')
      .then(({ data }) => {
        setForm({ nombre: data.nombre, email: data.email });
      })
      .catch(() => {
        setErrorMsg('No se pudo cargar tu perfil.');
      });
  }, []);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setErrorMsg('');
    try {
      await api.put('/user', form);
      setMsg('Perfil actualizado correctamente.');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Error al actualizar perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editar-perfil-page">
      <h2>Editar Perfil</h2>

      {/* Mensajes inline */}
      {msg && <div className="ep-alert ep-success">{msg}</div>}
      {errorMsg && <div className="ep-alert ep-error">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="ep-form">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Guardando…' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
}
