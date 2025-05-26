import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../../css/gestion-stock.css';

export default function GestionStock() {
  const [casas, setCasas]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg]         = useState(null);

  //La carga inicial
  const fetchCasas = async () => {
    try {
      const { data } = await api.get('/casas');
      setCasas(data);
    } catch (err) {
      console.error('Error al cargar casas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCasas();
    const iv = setInterval(fetchCasas, 5000);
    return () => clearInterval(iv);
  }, []);

  // Cambia el estado de una casa
  const handleChange = async (id, nuevoEstado, titulo) => {
    try {
      await api.patch(`/casas/${id}`, { estado: nuevoEstado });
      setCasas(cs =>
        cs.map(c => c.id === id ? { ...c, estado: nuevoEstado } : c)
      );
      setMsg(`"${titulo}" ahora está "${nuevoEstado}".`);
      setTimeout(() => setMsg(null), 3000);
    } catch (err) {
      console.error('Error al actualizar estado:', err);
      setMsg('No se pudo cambiar el estado.');
      setTimeout(() => setMsg(null), 3000);
    }
  };

  if (loading) {
    return <p className="gs-loading">Cargando gestión de stock…</p>;
  }

  return (
    <div className="gs-page">
      <h2>Gestión de Stock</h2>
      <p className="gs-desc">
        Sistema que actualiza en tiempo real la disponibilidad de las viviendas.
      </p>

      {msg && <div className="gs-alert">{msg}</div>}

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
              <td className="gs-td-select">
                <select
                  value={c.estado}
                  onChange={e => handleChange(c.id, e.target.value, c.titulo)}
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
