import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../../css/mis-transacciones.css';

export default function MisTransacciones() {
  const [reservas, setReservas]   = useState([]);
  const [compras, setCompras]     = useState([]);
  const [loadingReservas, setLoadingReservas] = useState(false);
  const [loadingCompras, setLoadingCompras]   = useState(false);

  // Fetch de reservas
  const fetchReservas = async () => {
    setLoadingReservas(true);
    try {
      const { data } = await api.get('/reservas');
      console.log('reservas recibidas:', data.reservas);
      setReservas(data.reservas || []);
    } catch (err) {
      console.error('Error cargando reservas:', err);
      
    } finally {
      setLoadingReservas(false);
    }
  };

  // Fetch de compras
  const fetchCompras = async () => {
    setLoadingCompras(true);
    try {
      const { data } = await api.get('/compras');
      console.log('compras recibidas:', data.compras);
      setCompras(data.compras || []);
    } catch (err) {
      console.error('Error cargando compras:', err);
      
    } finally {
      setLoadingCompras(false);
    }
  };

  useEffect(() => {
    fetchReservas();
    fetchCompras();
  }, []);

  // Eliminar reserva
  const handleEliminarReserva = async id => {
    if (!window.confirm('¿Eliminar esta reserva?')) return;
    try {
      await api.delete(`/reservas/${id}`);
      setReservas(prev => prev.filter(r => r.id !== id));
      alert('Reserva eliminada.');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al eliminar reserva.');
    }
  };

  // Eliminar compra
  const handleEliminarCompra = async id => {
    if (!window.confirm('¿Eliminar esta compra?')) return;
    try {
      await api.delete(`/compras/${id}`);
      setCompras(prev => prev.filter(c => c.id !== id));
      alert('Compra eliminada.');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al eliminar compra.');
    }
  };

  return (
    <div className="mis-transacciones-page">
      <h2>Mis Transacciones</h2>

      <section className="trans-section">
        <h3>Reservas</h3>
        {loadingReservas ? (
          <p>Cargando reservas…</p>
        ) : reservas.length === 0 ? (
          <p>No tienes reservas activas.</p>
        ) : (
          <ul className="trans-list">
            {reservas.map(r => (
              <li key={r.id} className="trans-item reserva">
                <div>
                  <strong>Casa {r.house_id}</strong>  
                  <span> Fianza "{r.fianza} €"</span>  
                  <span>
                    {new Date(r.fecha_inicio).toLocaleDateString()}
                  </span>
                </div>
            
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="trans-section">
        <h3>Compras</h3>
        {loadingCompras ? (
          <p>Cargando compras…</p>
        ) : compras.length === 0 ? (
          <p>No tienes compras registradas.</p>
        ) : (
          <ul className="trans-list">
            {compras.map(c => (
              <li key={c.id} className="trans-item compra">
                <div>
                  <strong>Casa {c.house_id}</strong>  
                 
                  <span>
                    {c.fecha_compra
                      ? new Date(c.fecha_compra).toLocaleDateString()
                      : '—'}
                  </span>
                </div>
          
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
