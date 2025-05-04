import React from 'react';
// subimos dos niveles desde js/components hasta css/
import '../../css/housecard.css';

export default function HouseCard({ house }) {
  return (
    <article className="house-card">
      <img
        src={house.imagen} 
        alt={house.titulo}
      />
      <div className="card-body">
        <h3>{house.titulo}</h3>
        <p className={`status ${house.estado}`}>{house.estado}</p>
        <p className="price">{house.precio.toLocaleString()} €</p>
        <div className="card-actions">
          <button>Favoritos ❤️</button>
          <button>Reservar 📅</button>
        </div>
      </div>
    </article>
  );
}
