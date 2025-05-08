// resources/js/Pages/HouseDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/housedetail.css';

export default function HouseDetail() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/casas/${id}`)
      .then(res => setHouse(res.data))
      .catch(() => setHouse(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!house)  return <Navigate to="/" replace />;

  return (
    <div className="house-detail">
      <img
        className="hd-img"
        src={house.imagen}
        alt={house.titulo}
      />
      <div className="hd-info">
        <h2>{house.titulo}</h2>
        <p><strong>Precio:</strong> {house.precio} €</p>
        <p><strong>Dirección:</strong> {house.direccion}</p>
        <p><strong>Estado:</strong> {house.estado}</p>
        <p><strong>Desc:</strong> {house.descripcion}</p>
        <div className="hd-actions">
          <button>Comprar</button>
          <button>Añadir al carrito</button>
        </div>
      </div>
    </div>
  );
}
