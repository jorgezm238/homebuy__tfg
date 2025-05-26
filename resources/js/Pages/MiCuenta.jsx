import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../../css/micuenta.css';

export default function MiCuenta() {
  const [user, setUser]                         = useState(null);
  const [stats, setStats]                       = useState({ reservas: 0, compras: 0, favoritos: 0 });
  const [ultimasReservas, setUltimasReservas]   = useState([]);
  const [ultimasCompras, setUltimasCompras]     = useState([]);
  const [ultimosFavoritos, setUltimosFavoritos] = useState([]);
  const [toast, setToast]                       = useState('');
  const navigate = useNavigate();

  //auto‐ocultar el toast tras 3 segundos
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  //carga inicial de datos
  useEffect(() => {
    api.get('/user')
      .then(({ data }) => setUser(data))
      .catch(() => setToast('Error al cargar perfil'));

    api.get('/reservas')
      .then(({ data }) => {
        const all = data.reservas || [];
        setStats(s => ({ ...s, reservas: all.length }));
        setUltimasReservas(all.slice(0, 3));
      });

    api.get('/compras')
      .then(({ data }) => {
        const all = data.compras || [];
        setStats(s => ({ ...s, compras: all.length }));
        setUltimasCompras(all.slice(0, 3));
      });

    api.get('/favoritos')
      .then(({ data }) => {
        const all = data.favoritos || [];
        setStats(s => ({ ...s, favoritos: all.length }));
        setUltimosFavoritos(all.slice(0, 3));
      });
  }, []);

  //eliminar favorito sin confirm
  const handleBorrarFavorito = async favId => {
    try {
      await api.delete(`/favoritos/${favId}`);
      setUltimosFavoritos(list => list.filter(f => f.id !== favId));
      setStats(s => ({ ...s, favoritos: s.favoritos - 1 }));
      setToast('Se ha eliminado de favoritos');
    } catch {
      setToast('Error al eliminar favorito');
    }
  };

  if (!user) {
    return <p className="mc-loading">Cargando datos de tu cuenta…</p>;
  }

  return (
    <div className="mc-page">
      <section className="mc-card perfil">
        <h2>Hola, {user.nombre}</h2>
        <div className="mc-field"><span>Email:</span> {user.email}</div>
        <div className="mc-field"><span>Tipo:</span> {user.tipo}</div>
        <div className="mc-field">
          <span>Creado el:</span> {new Date(user.created_at).toLocaleDateString()}
        </div>
        <div className="mc-field">
          <span>Última actualización:</span> {new Date(user.updated_at).toLocaleDateString()}
        </div>
        <div className="mc-actions">
          <button onClick={() => navigate('/editar-perfil')}>Editar perfil</button>
          <button onClick={() => navigate('/cambiar-password')}>Cambiar contraseña</button>
          <button onClick={async () => {
            await api.post('/logout');
            localStorage.removeItem('token');
            navigate('/login');
          }}>
            Cerrar sesión
          </button>
        </div>
      </section>

      <section className="mc-stats">
        <div className="stat-box">
          <h3>Reservas</h3>
          <p>{stats.reservas}</p>
        </div>
        <div className="stat-box">
          <h3>Compras</h3>
          <p>{stats.compras}</p>
        </div>
        <div className="stat-box">
          <h3>Favoritos</h3>
          <p>{stats.favoritos}</p>
        </div>
      </section>

¡      <section className="mc-lists">

        <div className="list-section">
          <h3>Últimas Reservas</h3>
          {ultimasReservas.length > 0 ? (
            <ul>
              {ultimasReservas.map(r => (
                <li key={r.id}>
                  <span>Casa {r.house_id}</span>
                  <span>{new Date(r.fecha_inicio).toLocaleDateString()}</span>
                  <button
                    className="btn-ver"
                    onClick={() => navigate(`/propiedad/${r.house_id}`)}
                  >
                    Ver
                  </button>
                </li>
              ))}
            </ul>
          ) : <p>No tienes reservas recientes.</p>}
        </div>

        <div className="list-section">
          <h3>Últimas Compras</h3>
          {ultimasCompras.length > 0 ? (
            <ul>
              {ultimasCompras.map(c => (
                <li key={c.id}>
                  <span>Casa {c.house_id}</span>
                  <span>{new Date(c.fecha_compra).toLocaleDateString()}</span>
                  <button
                    className="btn-ver"
                    onClick={() => navigate(`/propiedad/${c.house_id}`)}
                  >
                    Ver
                  </button>
                </li>
              ))}
            </ul>
          ) : <p>No tienes compras recientes.</p>}
        </div>

        <div className="favorites-wrapper">
          <div className="list-section favorites">
            <h3>Últimos Favoritos</h3>
            {ultimosFavoritos.length > 0 ? (
              <ul>
                {ultimosFavoritos.map(f => (
                  <li key={f.id}>
                    <span>Casa {f.house_id}</span>
                    <div className="fav-actions">
                      <button
                        className="btn-ver"
                        onClick={() => navigate(`/propiedad/${f.house_id}`)}
                      >
                        Ver
                      </button>
                      <button
                        className="btn-borrar-fav"
                        onClick={() => handleBorrarFavorito(f.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tienes favoritos recientes.</p>
            )}
          </div>

          {toast && <div className="fav-toast-outside">{toast}</div>}
        </div>
      </section>
    </div>
  );
}
