// resources/js/pages/Checkout.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/checkout.css';

export default function Checkout() {
  const [processing, setProcessing] = useState(true);
  const [message, setMessage]       = useState('');
  const navigate                     = useNavigate();

  useEffect(() => {
    const doCheckout = async () => {
      try {
        // 1) Cargo el carrito
        const { data } = await api.get('/carrito');
        const carrito = data.carrito;

        if (!carrito.items.length) {
          setMessage('Tu carrito está vacío.');
          setProcessing(false);
          return;
        }

        // 2) Por cada item, registro la compra y borro el item del carrito
        for (const item of carrito.items) {
          await api.post('/compras', { house_id: item.casa_id });
          await api.delete(`/carrito/${item.id}`);
        }

        setMessage('¡Compra realizada con éxito!');
      } catch (err) {
        console.error('Error en checkout', err);
        setMessage(
          err.response?.data?.message ||
          'Error al procesar la compra. Inténtalo de nuevo.'
        );
      } finally {
        setProcessing(false);
      }
    };

    doCheckout();
  }, []);

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        {processing ? (
          <p className="checkout-loading">Procesando tu compra…</p>
        ) : (
          <>
            <h2 className="checkout-title">
              {message.startsWith('¡') ? '✅ ' : '❌ '}
              {message}
            </h2>
            <button
              className="checkout-btn"
              onClick={() => navigate('/')}
            >
              Volver al inicio
            </button>
          </>
        )}
      </div>
    </div>
  );
}
