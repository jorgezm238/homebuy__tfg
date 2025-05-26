import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/contacto.css';

export default function Contacto() {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const [casaId, setCasaId]   = useState('');
  const [tipo, setTipo]       = useState('informacion');
  const [mensaje, setMensaje] = useState('');
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');

const handleSubmit = async e => {
  e.preventDefault();
  setError(''); setSuccess('');
  try {
    await api.post('/contacto', { casa_id: casaId, tipo, mensaje });
    setSuccess('¡Solicitud enviada correctamente!');
    setCasaId(''); setTipo('informacion'); setMensaje('');
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.mensaje || 'Error al enviar la solicitud.');
  }
};


  return (
    <div className="contacto-page">
      <h2>Contacto</h2>
      {error   && <div className="contacto-error">{error}</div>}
      {success && <div className="contacto-success">{success}</div>}

      <form onSubmit={handleSubmit} className="contacto-form">
        <label htmlFor="casa">Número del inmueble</label>
        <input
          id="casa"
          type="number"
          value={casaId}
          onChange={e => setCasaId(e.target.value)}
          placeholder="Ej. 123"
          required
        />

        <label htmlFor="tipo">Tipo de solicitud</label>
        <select
          id="tipo"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          required
        >
          <option value="informacion">Información</option>
          <option value="visita">Visita</option>
          <option value="consulta">Consulta</option>
        </select>

        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje..."
          required
        />

        <button type="submit">Enviar solicitud</button>
      </form>
    </div>
  );
}
