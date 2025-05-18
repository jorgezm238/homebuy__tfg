// resources/js/Pages/Reservar.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/reservar.css';

export default function Reservar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fianza, setFianza]       = useState(50000);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState('');
  const [loading, setLoading]     = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (isNaN(fianza) || fianza < 50000) {
      setError('La fianza debe ser al menos 50 000 €.');
      setSuccess('');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await api.post('/reservas', { house_id: id, fianza });
      setSuccess('✅ ¡Reserva registrada correctamente!');
      // opcional: redirigir tras 2s
      setTimeout(() => navigate('/mis-reservas'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al reservar.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reservar-page">
      <h2>Reservar vivienda #{id}</h2>

      {success && <div className="reservar-success">{success}</div>}
      {error   && <div className="reservar-error">{error}</div>}

      <form onSubmit={handleSubmit} className="reservar-form">
        <label htmlFor="fianza">Fianza (€):</label>
        <input
          id="fianza"
          type="number"
          min="50000"
          value={fianza}
          onChange={e => setFianza(Number(e.target.value))}
          disabled={!!success}
        />

        <button type="submit" disabled={loading || !!success}>
          {loading
            ? 'Reservando…'
            : success
              ? '✔️ Reserva completa'
              : 'Confirmar Reserva'}
        </button>
      </form>
    </div>
  );
}
