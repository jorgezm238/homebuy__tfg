import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/housecard.css';

export default function HouseCard({ house, onUpdate }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    navigate(`/propiedad/${house.id}`);
  };

  const promptFianza = async () => {
    const entrada = window.prompt(
      'Introduce la fianza para reservar esta casa (mínimo 50 000 €):',
      '50000'
    );
    if (entrada === null) return null;
    const f = parseInt(entrada, 10);
    if (isNaN(f) || f < 50000) {
      window.alert('La fianza debe ser un número y al menos 50 000 €.');
      return null;
    }
    return f;
  };

  const handleReservar = async e => {
    e.stopPropagation();
    const fianza = await promptFianza();
    if (fianza === null) return;

    setLoading(true);
    try {
      const { data } = await api.post('/reservas', {
        house_id: house.id,
        fianza
      });
      window.alert('✅ Reserva solicitada correctamente.');
      onUpdate?.(data.casa); // avisar al padre para refrescar la lista o actualizar este house
    } catch (err) {
      console.error('API error response:', err.response?.data);
      const msg = err.response?.data?.message
        || (err.response?.data?.errors && Object.values(err.response.data.errors).flat().join('\n'))
        || 'Error al enviar la reserva.';
      window.alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleComprar = async e => {
    e.stopPropagation();
    if (!window.confirm('¿Confirmas tu compra definitiva de esta casa?')) return;

    setLoading(true);
    try {
      const { data } = await api.post('/compras', { house_id: house.id });
      window.alert('✅ Compra registrada correctamente.');
      onUpdate?.(data.casa);
    } catch (err) {
      console.error('API error response:', err.response?.data);
      const msg = err.response?.data?.message || 'Error al procesar la compra.';
      window.alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const estadoColor = {
    disponible: 'green',
    reservada:  'orange',
    vendida:    'red',
  }[house.estado] || 'black';

  return (
    <div className="house-card" onClick={handleClick} style={{ opacity: loading ? 0.6 : 1 }}>
      <div className="hc-image-wrapper">
        <img
          src={house.imagen}
          alt={house.titulo}
          onError={e => e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image'}
        />
      </div>
      <div className="hc-body">
        <h3>{house.titulo}</h3>
        <p className="hc-estado" style={{ color: estadoColor }}>
          {house.estado.charAt(0).toUpperCase() + house.estado.slice(1)}
        </p>
        <p className="hc-precio">{Number(house.precio).toLocaleString()} €</p>
        <p className="hc-direccion">{house.direccion}</p>
        <p className="hc-direccion">
          Número del Inmueble → <strong>{house.id}</strong>
        </p>
        <div className="hc-actions">
          <button onClick={handleReservar} disabled={loading || house.estado !== 'disponible'}>
            Reservar
          </button>
          <button onClick={handleComprar} disabled={loading || house.estado !== 'reservada'}>
            Comprar
          </button>
          <button onClick={e => e.stopPropagation()} disabled>
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
