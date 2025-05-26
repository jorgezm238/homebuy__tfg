import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiHeart, FiShoppingCart } from 'react-icons/fi';
import api from '../services/api';
import '../../css/housecard.css';

export default function HouseCard({ house, onUpdate }) {
  const navigate = useNavigate();
  const token    = localStorage.getItem('token');

  const [loading, setLoading]       = useState(false);
  const [isFavorito, setIsFavorito] = useState(house.isFavorito ?? false);
  const [inCart, setInCart]         = useState(house.inCart    ?? false);
  const [toast, setToast]           = useState('');  

  //ocultar el toast tras 3 segundos
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  //al hacer click en la tarjets vamos al detalle
  const handleClick = () => {
    navigate(`/propiedad/${house.id}`);
  };

  //reservar redirige al formulario o a login si no hay token
  const handleReservar = e => {
    e.stopPropagation();
    if (!token) {
      navigate('/register');
    } else {
      navigate(`/reservar/${house.id}`);
    }
  };

  //favoritos con toast y login redirect
  const handleFavorito = async e => {
    e.stopPropagation();
    if (!token) {
      navigate('/register');
      return;
    }
    if (isFavorito) return;
    setLoading(true);
    try {
      await api.post('/favoritos', { house_id: house.id });
      setIsFavorito(true);
      setToast('Casa añadida a favoritos');
      onUpdate?.();
    } catch (err) {
      console.error(err);
      setToast(err.response?.data?.message || 'Error al añadir a favoritos');
    } finally {
      setLoading(false);
    }
  };

  //carrito con el toast y login redirect
  const handleAddToCart = async e => {
    e.stopPropagation();
    if (!token) {
      navigate('/register');
      return;
    }
    if (inCart) return;
    setLoading(true);
    try {
      await api.post('/carrito', { house_id: house.id });
      setInCart(true);
      setToast('Casa añadida al carrito');
      onUpdate?.();
    } catch (err) {
      console.error(err);
      setToast(err.response?.data?.message || 'Error al añadir al carrito');
    } finally {
      setLoading(false);
    }
  };

  //color del estado
  const estadoColor = {
    disponible: 'green',
    reservada:  'orange',
    vendida:    'red',
  }[house.estado] || 'black';

  return (
    <div
      className="house-card"
      onClick={handleClick}
      style={{ opacity: loading ? 0.6 : 1 }}
    >
      {toast && <div className="hc-toast">{toast}</div>}

      <div className="hc-image-wrapper">
        <img
          src={house.imagen}
          alt={house.titulo}
          //aqui puse un fondo negro por si no cargan las imagenes
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
          <button
            className="hc-btn-reservar"
            onClick={handleReservar}
            disabled={loading || house.estado !== 'disponible'}
          >
            <FiCalendar /> Reservar
          </button>

          <button
            className="hc-btn-favorito"
            onClick={handleFavorito}
            disabled={loading || isFavorito}
          >
            <FiHeart /> {isFavorito ? 'Favorito' : 'Añadir a favoritos'}
          </button>

          <button
            className="hc-btn-carrito"
            onClick={handleAddToCart}
            disabled={loading || inCart || house.estado === 'vendida'}
          >
            <FiShoppingCart /> {inCart ? 'En el carrito' : 'Añadir al carrito'}
          </button>
        </div>
      </div>
    </div>
  );
}
