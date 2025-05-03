import React from 'react';
import '../../css/housecard.css';

export default function HouseCard({ casa }) {
  // Ruta de ejemplo a la imagen en storage
  const imagenUrl = casa.imagen
    ? `http://localhost:8000/storage/images/${casa.imagen}`
    : 'https://via.placeholder.com/300x200?text=Sin+imagen';

  return (
    <div className="house-card">
      <img className="house-card__img" src={imagenUrl} alt={casa.titulo} />
      <div className="house-card__info">
        <h3 className="house-card__titulo">{casa.titulo}</h3>
        <p className="house-card__estado">{casa.estado}</p>
      </div>
    </div>
  );
}
