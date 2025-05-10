import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/carrito.css';

export default function Carrito() {
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Cargar carrito al montar
  useEffect(() => {
    fetchCarrito();
  }, []);

  const fetchCarrito = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/carrito');
      setCarrito(data.carrito);
    } catch (err) {
      console.error('Error cargando carrito:', err);
      alert('No se pudo cargar el carrito.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async itemId => {
    if (!window.confirm('¿Eliminar este elemento del carrito?')) return;
    try {
      await api.delete(`/carrito/${itemId}`);
      setCarrito(c => ({
        ...c,
        items: c.items.filter(i => i.id !== itemId)
      }));
    } catch (err) {
      console.error('Error eliminando item:', err);
      alert('No se pudo eliminar el item.');
    }
  };

  const handleEmpty = async () => {
    if (!carrito?.items.length) return;
    if (!window.confirm('¿Vaciar todo el carrito?')) return;
    try {
      // borramos uno a uno
      await Promise.all(carrito.items.map(i => api.delete(`/carrito/${i.id}`)));
      setCarrito(c => ({ ...c, items: [] }));
    } catch (err) {
      console.error('Error vaciando carrito:', err);
      alert('No se pudo vaciar el carrito.');
    }
  };

  const handleCheckout = () => {
    // Aquí podrías redirigir a la página de checkout/pago
    navigate('/checkout');
  };

  if (loading || !carrito) {
    return <p className="car-cargando">Cargando carrito…</p>;
  }

  return (
    <div className="carrito-page">
      <h2>Mi Carrito</h2>

      {carrito.items.length === 0 ? (
        <p className="empty">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="carrito-list">
            {carrito.items.map(item => (
              <li key={item.id} className="carrito-item">
                <div className="ci-info">
                  <strong>{item.casa.titulo || `Casa #${item.casa_id}`}</strong>
                  <span>Cantidad: {item.cantidad}</span>
                </div>
                <button
                  className="ci-remove"
                  onClick={() => handleRemove(item.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <div className="carrito-actions">
            <button className="btn-empty" onClick={handleEmpty}>
              Vaciar carrito
            </button>
            <button className="btn-checkout" onClick={handleCheckout}>
              Proceder a la compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}
