// resources/js/Pages/HouseDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import api from '../services/api';
import '../../css/housedetail.css';

export default function HouseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [house, setHouse]           = useState(null);
  const [slides, setSlides]         = useState([]);
  const [current, setCurrent]       = useState(0);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(false);

  const [favLoading, setFavLoading] = useState(false);
  const [isFav, setIsFav]           = useState(false);

  // Toast de favorito
  const [toast, setToast] = useState('');
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    setLoading(true);
    api.get(`/casas/${id}`)
      .then(({ data }) => {
        setHouse(data);
        setSlides(data.images?.length ? data.images : [data.imagen]);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    api.get('/favoritos')
      .then(({ data }) => {
        const found = data.favoritos?.some(f => f.casa_id === Number(id));
        setIsFav(found);
      })
      .catch(() => {});
  }, [id]);

  if (loading) return <p className="hd-loading">Cargando propiedad…</p>;
  if (error || !house) return <Navigate to="/" replace />;

  // Slider controls
  const prev = () => setCurrent(i => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrent(i => (i + 1) % slides.length);
  const goTo = idx => setCurrent(idx);

  // Reservar → redirigir
  const handleReservar = e => {
    e.stopPropagation();
    navigate(`/reservar/${house.id}`);
  };

  // Favorito con toast
  const handleFavorito = async e => {
    e.stopPropagation();
    if (isFav) {
      setToast('Ya es favorito');
      return;
    }
    setFavLoading(true);
    try {
      await api.post('/favoritos', { house_id: house.id });
      setIsFav(true);
      setToast('Casa añadida a favoritos');
    } catch (err) {
      console.error(err);
      setToast(err.response?.data?.message || 'Error al añadir a favoritos');
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <div className="house-detail-slider">
      {/* Slider */}
      <div className="slider-container">
        {slides.map((url, idx) => (
          <img
            key={url}
            src={url}
            alt={`${house.titulo} ${idx + 1}`}
            className={`slide ${idx === current ? 'active' : ''}`}
          />
        ))}
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

      {/* Detalle */}
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
          <button
            className="hd-btn hd-btn-primary"
            onClick={handleReservar}
            disabled={house.estado !== 'disponible'}
          >
            Reservar
          </button>

          {/* Wrapper para posicionar el toast */}
          <div className="fav-wrapper">
            <button
              className="hd-btn hd-btn-secondary"
              onClick={handleFavorito}
              disabled={favLoading}
            >
              <FiHeart style={{ marginRight: '0.5rem' }} />
              {isFav ? 'Favorito' : 'Añadir a favoritos'}
            </button>
            {toast && <div className="hd-toast">{toast}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
