import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../../css/mis-compras.css';

export default function MisCompras() {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/compras');
        setCompras(data.compras || []);
      } catch (err) {
        console.error('Error al cargar compras:', err);
        alert('No se pudieron cargar tus compras.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleEliminar = async id => {
    if (!window.confirm('¿Confirmas que quieres eliminar esta compra?')) return;
    try {
      await api.delete(`/compras/${id}`);
      setCompras(compras.filter(c => c.id !== id));
      alert('Compra eliminada correctamente.');
    } catch (err) {
      console.error('Error al eliminar compra:', err);
      alert(err.response?.data?.message || 'No se pudo eliminar la compra.');
    }
  };

  return (
    <div className="mis-compras">
      <h2>Mis Compras</h2>
      {loading && <p className="mc-loading">Cargando compras…</p>}
      {!loading && compras.length === 0 && (
        <p className="mc-empty">No tienes compras registradas.</p>
      )}
      {!loading && compras.length > 0 && (
        <ul className="mc-list">
          {compras.map(c => (
            <li key={c.id} className="mc-item">
              <div className="mc-info">
                <span className="mc-id">Compra #{c.id}</span>
                <span className="mc-house">Casa #{c.house_id}</span>
                <span className="mc-date">
                  {c.fecha_compra
                    ? new Date(c.fecha_compra).toLocaleDateString()
                    : '–'}
                </span>
              </div>
              <button
                className="mc-btn-eliminar"
                onClick={() => handleEliminar(c.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
