import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/carrito.css';

export default function Carrito() {
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast]     = useState('');
  const navigate               = useNavigate();

  //carga inicial
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

  //eliminar un ítem
  const handleRemove = async itemId => {
    if (!window.confirm('¿Eliminar este elemento del carrito?')) return;
    try {
      await api.delete(`/carrito/${itemId}`);
      fetchCarrito();
    } catch (err) {
      console.error('Error eliminando item:', err);
      alert('No se pudo eliminar el item.');
    }
  };

  //vaciar carrito
  const handleEmpty = async () => {
    if (!carrito?.items.length) return;
    if (!window.confirm('¿Vaciar todo el carrito?')) return;
    try {
      await Promise.all(
        carrito.items.map(i => api.delete(`/carrito/${i.id}`))
      );
      fetchCarrito();
    } catch (err) {
      console.error('Error vaciando carrito:', err);
      alert('No se pudo vaciar el carrito.');
    }
  };

  //checkout sin diálogo nativo
  const handleCheckout = () => {
    //muestra toast
    setToast('🛒 Redirigiendo a pago…');
    setTimeout(() => {
      navigate('/checkout');
    }, 800);
  };

  //auto-ocultar toast en 3s
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  if (loading) {
    return <p className="car-cargando">Cargando carrito…</p>;
  }

  if (!carrito || carrito.items.length === 0) {
    return (
      <div className="carrito-page">
        <h2>Mi Carrito</h2>
        <p className="empty">Tu carrito está vacío.</p>
      </div>
    );
  }

  const total = carrito.items.reduce(
    (sum, i) => sum + i.cantidad * Number(i.casa.precio),
    0
  );

  return (
    <div className="carrito-page">
      <h2>Mi Carrito</h2>

      {toast && <div className="cart-toast">{toast}</div>}

      <table className="cart-table">
        <thead>
          <tr>
            <th>Inmueble</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.items.map(item => (
            <tr key={item.id}>
              <td className="cart-item">
                <img
                  src={item.casa.imagen}
                  alt={item.casa.titulo}
                  onError={e => e.currentTarget.src = 'https://via.placeholder.com/80'}
                />
                <span>{item.casa.titulo}</span>
              </td>
              <td>€ {Number(item.casa.precio).toLocaleString()}</td>
              <td>{item.cantidad}</td>
              <td>€ {(item.cantidad * Number(item.casa.precio)).toLocaleString()}</td>
              <td>
                <button
                  className="ci-remove"
                  onClick={() => handleRemove(item.id)}
                >✕</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="total-label">Total:</td>
            <td className="total-amount">€ {total.toLocaleString()}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <div className="carrito-actions">
        <button className="btn-empty" onClick={handleEmpty}>
          Vaciar carrito
        </button>
        <button className="btn-checkout" onClick={handleCheckout}>
          Comprar
        </button>
      </div>
    </div>
  );
}
