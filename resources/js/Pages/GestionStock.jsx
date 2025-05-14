// resources/js/pages/GestionStock.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../../css/gestion-stock.css';

export default function GestionStock() {
  const [casas, setCasas]     = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCasas = async () => {
    try {
      const { data } = await api.get('/casas');
      setCasas(data);
    } catch (err) {
      console.error('Error fetch /casas:', err.response || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCasas();
    const iv = setInterval(fetchCasas, 5000);
    return () => clearInterval(iv);
  }, []);

  const handleChange = async (id, nuevoEstado) => {
    try {
      const { data } = await api.patch(`/casas/${id}`, { estado: nuevoEstado });
      // Actualiza solo esa fila en local
      setCasas(cs =>
        cs.map(c => c.id === id ? { ...c, estado: data.casa.estado } : c)
      );
    } catch (err) {
      console.error('Error al actualizar estado:', err.response || err);
      alert(
        err.response?.data?.message
          || `Error al actualizar (status ${err.response?.status})`
      );
    }
  };

  if (loading) return <p className="gs-loading">Cargando gestión de stock…</p>;

  return (
    <div className="gs-page">
      <h2>Gestión de Stock</h2>
      <p className="gs-desc">
        Sistema que actualiza en tiempo real la disponibilidad de las viviendas.
      </p>
      <table className="gs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {casas.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.titulo}</td>
              <td>
                <select
                  value={c.estado}
                  onChange={e => handleChange(c.id, e.target.value)}
                >
                  <option value="disponible">Disponible</option>
                  <option value="reservada">Reservada</option>
                  <option value="vendida">Vendida</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
