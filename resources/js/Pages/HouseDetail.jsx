import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/housedetail.css';

export default function HouseDetail() {
  const { id } = useParams();
  const [house, setHouse]         = useState(null);
  const [slides, setSlides]       = useState([]);      // URLs de todas las imágenes
  const [current, setCurrent]     = useState(0);       // índice del slide activo
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/casas/${id}`)
      .then(({ data }) => {
        setHouse(data);
        // construimos array de URLs completas
        const imgs = (data.images && data.images.length)
          ? data.images
          : [data.imagen];
        setSlides(imgs);
        setCurrent(0);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="hd-loading">Cargando propiedad…</p>;
  if (error || !house) return <Navigate to="/" replace />;

  const prev = () => setCurrent(i => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrent(i => (i + 1) % slides.length);
  const goTo = idx => setCurrent(idx);

  return (
    <div className="house-detail-slider">
      {/* Slider */}
      <div className="slider-container">
        {slides.map((url, idx) => (
          <img
            key={url}
            src={url}
            alt={`${house.titulo} ${idx+1}`}
            className={`slide ${idx === current ? 'active' : ''}`}
          />
        ))}

        {/* Controles */}
        {slides.length > 1 && (
          <>
            <button className="nav prev" onClick={prev}>&lsaquo;</button>
            <button className="nav next" onClick={next}>&rsaquo;</button>

            <div className="dots">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${idx === current ? 'active' : ''}`}
                  onClick={() => goTo(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info de la casa */}
      <div className="hd-info">
        <h2>{house.titulo}</h2>
        <p><strong>Precio:</strong> {Number(house.precio).toLocaleString()} €</p>
        <p><strong>Dirección:</strong> {house.direccion}</p>
        <p>
          <strong>Estado:</strong>{' '}
          <span className={`hd-estado hd-${house.estado}`}>
            {house.estado.charAt(0).toUpperCase() + house.estado.slice(1)}
          </span>
        </p>
        <p className="hd-desc"><strong>Descripción:</strong> {house.descripcion}</p>
        <div className="hd-actions">
          <button className="hd-btn hd-btn-primary">Comprar</button>
          <button className="hd-btn hd-btn-secondary">Añadir al carrito</button>
        </div>
      </div>
    </div>
  );
}
