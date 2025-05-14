// resources/js/components/NavBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/navbar.css';

export default function NavBar() {
  const navigate  = useNavigate();
  const token     = localStorage.getItem('token');

  // Datos de usuario y rol
  const [user, setUser]       = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Dropdowns y carrito
  const [showCart, setShowCart]       = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [carrito, setCarrito]         = useState(null);

  const cartRef    = useRef();
  const accountRef = useRef();

  // 1) Carga datos de usuario
  useEffect(() => {
    if (!token) return;
    api.get('/user')
      .then(({ data }) => {
        setUser(data);
        setIsAdmin(data.tipo === 'admin');
      })
      .catch(() => {
        setUser(null);
        setIsAdmin(false);
      });
  }, [token]);

  // 2) Carga inicial del carrito
  useEffect(() => {
    if (!token) return;
    api.get('/carrito')
      .then(({ data }) => setCarrito(data.carrito))
      .catch(() => {});
  }, [token]);

  // 3) Refrescar carrito al abrir el dropdown
  useEffect(() => {
    if (showCart && token) {
      api.get('/carrito')
        .then(({ data }) => setCarrito(data.carrito))
        .catch(() => {});
    }
  }, [showCart, token]);

  // 4) Cerrar dropdowns al clickar fuera
  useEffect(() => {
    const handler = e => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setShowAccount(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Logout
  const handleLogout = async () => {
    try { await api.post('/logout'); } catch {}
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Eliminar item del carrito
  const handleRemoveItem = async id => {
    try {
      await api.delete(`/carrito/${id}`);
      setCarrito(c => ({
        ...c,
        items: c.items.filter(i => i.id !== id)
      }));
    } catch {
      alert('No se pudo eliminar el elemento.');
    }
  };

  const totalItems = carrito?.items?.reduce((sum, i) => sum + i.cantidad, 0) || 0;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">HomeBuy</Link>
        <ul className="navbar-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>

          {token && isAdmin && (
            <li><Link to="/gestion-stock">Gestión de stock</Link></li>
          )}

          {token ? (
            <>
              {/* Mi Cuenta */}
              <li className="navbar-account" ref={accountRef}>
                <button
                  className="account-label"
                  onClick={e => {
                    e.stopPropagation();
                    setShowAccount(v => !v);
                  }}
                >
                  Mi Cuenta ▾
                </button>
                <ul className={`account-dropdown${showAccount ? ' open' : ''}`}>
                  <li><Link to="/mi-cuenta">Detalles</Link></li>
                  <li><Link to="/mis-transacciones">Transacciones</Link></li>
                  <li><button onClick={handleLogout}>Cerrar sesión</button></li>
                </ul>
              </li>

              {/* Carrito */}
              <li className="navbar-cart" ref={cartRef}>
                <button
                  className="cart-button"
                  onClick={e => {
                    e.stopPropagation();
                    setShowCart(v => !v);
                  }}
                >
                  <span className="cart-icon">🛒</span>
                  {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
                  )}
                </button>
                <div className={`cart-dropdown${showCart ? ' open' : ''}`}>
                  <h4>Tu Carrito</h4>
                  {carrito?.items.length ? (
                    <ul>
                      {carrito.items.map(item => (
                        <li key={item.id}>
                          <span className="cd-title">
                            {item.casa.titulo || `Casa #${item.casa_id}`}
                          </span>
                          <span className="cd-qty">x{item.cantidad}</span>
                          <button
                            className="cd-remove"
                            onClick={() => handleRemoveItem(item.id)}
                          >✕</button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty">Tu carrito está vacío.</p>
                  )}
                  <button
                    className="cd-checkout"
                    onClick={() => navigate('/carrito-detalle')}
                  >
                    Ver Carrito
                  </button>
                </div>
              </li>
            </>
          ) : (
            <li><Link to="/login">Iniciar Sesión</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}
