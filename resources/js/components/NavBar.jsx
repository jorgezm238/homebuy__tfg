import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../../css/navbar.css';

export default function NavBar() {
  const navigate  = useNavigate();
  const token     = localStorage.getItem('token');

  //datos de usuario y rol
  const [user, setUser]       = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  //estados del carrito y cuenta
  const [carrito, setCarrito]         = useState(null);
  const [showCart, setShowCart]       = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  //estados y refs para la búsqueda
  const [searchTerm, setSearchTerm]       = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch]       = useState(false);
  const searchRef = useRef();

  //refs para detectar clicks fuera
  const cartRef    = useRef();
  const accountRef = useRef();

  //carga datos de usuario
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

  //carga inicial del carrito
  useEffect(() => {
    if (!token) return;
    api.get('/carrito')
      .then(({ data }) => setCarrito(data.carrito))
      .catch(() => {});
  }, [token]);

  //refrescar carrito al abrir el dropdown
  useEffect(() => {
    if (showCart && token) {
      api.get('/carrito')
        .then(({ data }) => setCarrito(data.carrito))
        .catch(() => {});
    }
  }, [showCart, token]);

  //fetch de busqueda
  const fetchSearch = useCallback((q) => {
    if (!q) {
      setSearchResults([]);
      return;
    }
    api.get('/casas', { params: { q } })
      .then(({ data }) => setSearchResults(data.casas || []))
      .catch(() => setSearchResults([]));
  }, []);

  useEffect(() => {
    fetchSearch(searchTerm);
  }, [searchTerm, fetchSearch]);

  //cerrar dropdowns al clickar fuera
  useEffect(() => {
    const handler = e => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setShowAccount(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  //logout
  const handleLogout = async () => {
    try { await api.post('/logout'); } catch {}
    localStorage.removeItem('token');
    navigate('/login');
  };

  //eliminar item del carrito
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

  //enviar búsqueda
  const handleSearchSubmit = e => {
    e.preventDefault();
    navigate(`/busqueda?q=${encodeURIComponent(searchTerm)}`);
    setShowSearch(false);
  };

  const totalItems = carrito?.items?.reduce((sum, i) => sum + i.cantidad, 0) || 0;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">HomeBuy</Link>

        <div className="navbar-search" ref={searchRef}>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Busca tu vivienda"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setShowSearch(true);
              }}
            />
          </form>
          {showSearch && searchResults.length > 0 && (
            <ul className="search-dropdown">
              {searchResults.map(casa => (
                <li key={casa.id}>
                  <Link to={`/casas/${casa.id}`}>
                    {casa.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul className="navbar-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          {token && isAdmin && (
            <li><Link to="/gestion-stock">Gestión de stock</Link></li>
          )}

          {token ? (
            <>
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
