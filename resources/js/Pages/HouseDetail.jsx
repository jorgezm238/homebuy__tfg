// resources/js/pages/HouseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/housedetail.css';

export default function HouseDetail() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    api.get(`/casas/${id}`)
      .then(res => setHouse(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (!token) return <Navigate to="/login" replace />;
  if (loading) return <p className="hd-loading">Cargando…</p>;
  if (!house)   return <p className="hd-error">Propiedad no encontrada.</p>;

  return (
    <div className="hd-container">
      <div className="hd-card">
        <img
          className="hd-image"
          src={`http://localhost:8000/storage/images/${house.imagen}`}
          alt={house.titulo}
        />
        <div className="hd-details">
          <h2>{house.titulo}</h2>
          <p className="hd-desc">{house.descripcion}</p>
          <p><strong>Precio:</strong> {house.precio.toLocaleString()} €</p>
          <p><strong>Dirección:</strong> {house.direccion}</p>
          <p>
            <strong>Estado:</strong>{' '}
            <span className={`hd-estado hd-${house.estado}`}>
              {house.estado.charAt(0).toUpperCase() + house.estado.slice(1)}
            </span>
          </p>
          <div className="hd-actions">
            <button className="hd-buy">Comprar</button>
            <button className="hd-cart">Añadir al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
}
