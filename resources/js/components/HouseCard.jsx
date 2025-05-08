// resources/js/components/HouseCard.jsx
import React from 'react';
import { FiMail, FiPhone, FiHeart } from 'react-icons/fi';
import '../../css/housecard.css';

export default function HouseCard({ house }) {
  // Si algún día tienes varias imágenes, contarías house.images.length
  const contador = `1/1`;

  return (
    <div className="house-card">
      <div className="house-card__image-wrapper">
        <img
          src={house.imagen}         // <-- ahora apunta a /images/TuFoto.jpg
          alt={house.titulo}
          className="house-card__image"
        />
        <span className="house-card__count">{contador}</span>
      </div>
      <div className="house-card__info">
        <div className="house-card__price">
          {Number(house.precio).toLocaleString()} €
        </div>
        <div className="house-card__title">{house.titulo}</div>
        <div className="house-card__address">{house.direccion}</div>
        <div className="house-card__meta">
          {house.habitaciones} hab · {house.banos} baño{house.banos>1&&'s'} · {house.m2} m² · {house.planta}ª planta
        </div>
        <div className="house-card__actions">
          <button className="btn-contact"><FiMail /> Contactar</button>
          <button className="btn-call"><FiPhone /> Llamar</button>
          <button className="btn-fav"><FiHeart /></button>
        </div>
      </div>
    </div>
  );
}
