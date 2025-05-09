import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../../css/mis-reservas.css';

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carga inicial
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/reservas');
        setReservas(data.reservas || []);
      } catch (err) {
        console.error('Error al cargar reservas:', err);
        alert('No se pudieron cargar tus reservas.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleEliminar = async id => {
    if (!window.confirm('¿Confirmas que quieres eliminar esta reserva?')) return;
    try {
      await api.delete(`/reservas/${id}`);
      setReservas(reservas.filter(r => r.id !== id));
      alert('Reserva eliminada correctamente.');
    } catch (err) {
      console.error('Error al eliminar reserva:', err);
      alert(err.response?.data?.message || 'No se pudo eliminar la reserva.');
    }
  };

  return (
    <div className="mis-reservas">
      <h2>Mis Reservas</h2>
      {loading && <p className="mr-loading">Cargando reservas…</p>}
      {!loading && reservas.length === 0 && (
        <p className="mr-empty">No tienes reservas activas.</p>
      )}
      {!loading && reservas.length > 0 && (
        <ul className="mr-list">
          {reservas.map(r => (
            <li key={r.id} className="mr-item">
              <div className="mr-info">
                <span className="mr-id">Reserva #{r.id}</span>
                <span className="mr-house">Casa #{r.house_id}</span>
                <span className="mr-date">
                  {new Date(r.fecha_inicio).toLocaleDateString()}
                </span>
              </div>
              <button
                className="mr-btn-eliminar"
                onClick={() => handleEliminar(r.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
