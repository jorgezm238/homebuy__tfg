import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/housecard.css';

export default function HouseCard({ house }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/propiedad/${house.id}`);
  };

  const estadoColor = {
    disponible: 'green',
    reservada:  'orange',
    vendida:    'red',
  }[house.estado] || 'black';

  return (
    <div className="house-card" onClick={handleClick}>
      <div className="hc-image-wrapper">
        <img
          src={house.imagen}
          alt={house.titulo}
          onError={e => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
      </div>
      <div className="hc-body">
        <h3>{house.titulo}</h3>
        <p className="hc-estado" style={{ color: estadoColor }}>
          {house.estado.charAt(0).toUpperCase() + house.estado.slice(1)}
        </p>
        <p className="hc-precio">{Number(house.precio).toLocaleString()} €</p>
        <p className="hc-direccion">{house.direccion}</p>
        <div className="hc-actions">
          <button onClick={e => e.stopPropagation()}>Contactar</button>
          <button onClick={e => e.stopPropagation()}>Llamar</button>
        </div>
      </div>
    </div>
  );
}
