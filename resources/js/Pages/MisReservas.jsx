import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/mis-reservas.css';

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //carga inicial
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

  const handleVer = houseId => {
    navigate(`/propiedad/${houseId}`);
  };

  return (
    <div className="mr-page">
      <h2 className="mr-title">Mis Reservas</h2>

      {loading && <p className="mr-loading">Cargando reservas…</p>}

      {!loading && reservas.length === 0 && (
        <p className="mr-empty">No tienes reservas activas.</p>
      )}

      {!loading && reservas.length > 0 && (
        <ul className="mr-list">
          {reservas.map(r => (
            <li key={r.id} className="mr-item">
              <div className="mr-info">
                <span className="mr-label">Casa</span>
                <span className="mr-value">#{r.house_id}</span>
                <span className="mr-label">Fecha</span>
                <span className="mr-value">
                  {new Date(r.fecha_inicio).toLocaleDateString()}
                </span>
              </div>
              <div className="mr-actions">
                <button
                  className="mr-btn mr-btn-view"
                  onClick={() => handleVer(r.house_id)}
                >
                  Ver
                </button>

              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
