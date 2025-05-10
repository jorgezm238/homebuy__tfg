// resources/js/pages/HouseDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/housedetail.css';

export default function HouseDetail() {
  const { id } = useParams();

  const [house, setHouse]             = useState(null);
  const [slides, setSlides]           = useState([]);
  const [current, setCurrent]         = useState(0);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(false);

  const [reservaLoading, setReservaLoading] = useState(false);
  const [reservado, setReservado]           = useState(false);

  const [carritoLoading, setCarritoLoading] = useState(false);
  const [enCarrito, setEnCarrito]           = useState(false);

  const [hasReserved, setHasReserved] = useState(false);

  // Carga datos de casa, slides y verifica si ya reservó
  useEffect(() => {
    setLoading(true);
    api.get(`/casas/${id}`)
      .then(({ data }) => {
        setHouse(data);
        const imgs = data.images?.length ? data.images : [data.imagen];
        setSlides(imgs);
        setCurrent(0);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    api.get('/reservas')
      .then(({ data }) => {
        const found = data.reservas?.some(r => r.house_id === Number(id));
        setHasReserved(found);
        setReservado(found);
      })
      .catch(() => {});
  }, [id]);

  if (loading) return <p className="hd-loading">Cargando propiedad…</p>;
  if (error || !house) return <Navigate to="/" replace />;

  // Slider controls (se mantienen igual)
  const prev = () => setCurrent(i => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrent(i => (i + 1) % slides.length);
  const goTo = idx => setCurrent(idx);

  // Prompt para fianza
  const promptFianza = () => {
    const entrada = window.prompt(
      'Introduce la fianza para reservar esta casa (mínimo 50 000 €):',
      '50000'
    );
    if (entrada === null) return null;
    const f = parseInt(entrada.replace(/\D/g, ''), 10);
    if (isNaN(f) || f < 50000) {
      window.alert('La fianza debe ser un número y al menos 50 000 €.');
      return null;
    }
    return f;
  };

  // Acción de reservar
  const handleReservar = async () => {
    const fianza = promptFianza();
    if (fianza === null) return;
    if (!window.confirm(`Confirmar reserva con fianza de ${fianza.toLocaleString()} €?`)) {
      return;
    }
    setReservaLoading(true);
    try {
      await api.post('/reservas', { house_id: house.id, fianza });
      window.alert('✅ Reserva solicitada correctamente.');
      setReservado(true);
      setHasReserved(true);
      setHouse(prev => ({ ...prev, estado: 'reservada' }));
    } catch (err) {
      console.error(err);
      window.alert(err.response?.data?.message || 'Error al procesar la reserva.');
    } finally {
      setReservaLoading(false);
    }
  };

  // Acción de añadir al carrito (solo si ya reservó)
  const handleAddToCart = async () => {
    setCarritoLoading(true);
    try {
      await api.post('/carrito', { house_id: house.id });
      window.alert('🛒 Casa añadida al carrito.');
      setEnCarrito(true);
    } catch (err) {
      console.error(err);
      window.alert(err.response?.data?.message || 'Error al añadir al carrito.');
    } finally {
      setCarritoLoading(false);
    }
  };

  // Sólo habilitamos carrito si el usuario ya reservó (ignora estado de la casa)
  const canCarrito = hasReserved && !carritoLoading && !enCarrito;

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
          <button
            className="hd-btn hd-btn-primary"
            onClick={handleReservar}
            disabled={reservaLoading || reservado || house.estado !== 'disponible'}
          >
            {reservaLoading
              ? 'Reservando…'
              : reservado
                ? 'Reservado ✔️'
                : 'Reservar'}
          </button>

          <button
            className="hd-btn hd-btn-secondary"
            onClick={handleAddToCart}
            disabled={!canCarrito}
          >
            {carritoLoading
              ? 'Añadiendo…'
              : enCarrito
                ? 'En carrito 🛒'
                : 'Añadir al carrito'}
          </button>
        </div>
      </div>
    </div>
  );
}
