import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/micuenta.css';

export default function MiCuenta() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ reservas: 0, compras: 0 });
  const [ultimasReservas, setUltimasReservas] = useState([]);
  const [ultimasCompras, setUltimasCompras]   = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 1) Carga datos de usuario
    api.get('/user')
      .then(({ data }) => setUser(data))
      .catch(err => {
        console.error('Error al cargar perfil:', err);
        alert('No se pudo cargar tu perfil.');
      });

    // 2) Cargar todas las reservas y estadísticas, luego quedarnos con las últimas 3
    api.get('/reservas')
      .then(({ data }) => {
        const all = data.reservas || [];
        setStats(s => ({ ...s, reservas: all.length }));
        setUltimasReservas(all.slice(0, 3));
      })
      .catch(err => console.error('Error cargando reservas:', err));

    // 3) Cargar todas las compras y estadísticas, luego quedarnos con las últimas 3
    api.get('/compras')
      .then(({ data }) => {
        const all = data.compras || [];
        setStats(s => ({ ...s, compras: all.length }));
        setUltimasCompras(all.slice(0, 3));
      })
      .catch(err => console.error('Error cargando compras:', err));
  }, []);

  if (!user) {
    return <p className="mcargando">Cargando datos de tu cuenta…</p>;
  }

  return (
    <div className="micuenta-page">
      {/* Perfil */}
      <div className="mc-perfil-card">
        <h2>Hola, {user.nombre}</h2>
        <div className="mc-campo"><span className="mc-label">Email:</span> {user.email}</div>
        <div className="mc-campo"><span className="mc-label">Tipo:</span> {user.tipo}</div>
        <div className="mc-campo">
          <span className="mc-label">Creado el:</span>{' '}
          {new Date(user.created_at).toLocaleDateString()}
        </div>
        <div className="mc-campo">
          <span className="mc-label">Última actualización:</span>{' '}
          {new Date(user.updated_at).toLocaleDateString()}
        </div>
        <div className="mc-botones">
          <button onClick={() => navigate('/editar-perfil')}>Editar perfil</button>
          <button onClick={() => navigate('/cambiar-password')}>Cambiar contraseña</button>
          <button
            onClick={async () => {
              await api.post('/logout');
              navigate('/login');
            }}
          >Cerrar sesión</button>
        </div>
      </div>

      {/* Estadísticas globales */}
      <div className="mc-estadisticas">
        <div className="mc-stat-box">
          <h3>Reservas</h3>
          <p>{stats.reservas}</p>
        </div>
        <div className="mc-stat-box">
          <h3>Compras</h3>
          <p>{stats.compras}</p>
        </div>
      </div>

      {/* Últimas transacciones */}
      <div className="mc-ultimas">
        <div className="mc-ultimas-section">
          <h3>Últimas Reservas</h3>
          {ultimasReservas.length > 0 ? (
            <ul>
              {ultimasReservas.map(r => (
                <li key={r.id}>
                  Casa {r.house_id} — {' '}
                  {new Date(r.fecha_inicio).toLocaleDateString()}
                  <button onClick={() => navigate(`/propiedad/${r.house_id}`)}>
                    Ver
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes reservas recientes.</p>
          )}
        </div>
        <div className="mc-ultimas-section">
          <h3>Últimas Compras</h3>
          {ultimasCompras.length > 0 ? (
            <ul>
              {ultimasCompras.map(c => (
                <li key={c.id}>
                   Casa {c.house_id} — {' '}
                  {c.fecha_compra
                    ? new Date(c.fecha_compra).toLocaleDateString()
                    : '—'}
                  <button onClick={() => navigate(`/propiedad/${c.house_id}`)}>
                    Ver
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes compras recientes.</p>
          )}
        </div>
      </div>
    </div>
  );
}
