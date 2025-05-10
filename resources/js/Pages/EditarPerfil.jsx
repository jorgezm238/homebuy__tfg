// resources/js/pages/EditarPerfil.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/editar-perfil.css';

export default function EditarPerfil() {
  const [form, setForm] = useState({ nombre:'', email:'' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/user').then(({ data }) => {
      setForm({ nombre: data.nombre, email: data.email });
    });
  }, []);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/user', form);
      alert('Perfil actualizado.');
      navigate('/mi-cuenta');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al actualizar perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editar-perfil-page">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="ep-form">
        <label>Nombre</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
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
