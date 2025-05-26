import React from 'react';
import { Link, useLocation } from 'react-router-dom';

//mapa de nombres legibles para las rutas
const nameMap = {
  casas: 'Casas',
  busqueda: 'Búsqueda',
  contacto: 'Contacto',
  'mi-cuenta': 'Mi Cuenta',
  'mis-transacciones': 'Transacciones',
  reservar: 'Reservar',
  propiedad: 'Detalle'
};

export default function MigasDePan() {
  const { pathname } = useLocation();
  //partir la ruta en segmentos no vacíos
  const segmentos = pathname.split('/').filter(Boolean);

  //filtramos los segmentos que sean enteramente numéricos
  const segmentosLimpios = segmentos.filter(seg => !/^\d+$/.test(seg));

  //construir array de { to, nombre } solo con los segmentos “limpios”
  const rutas = segmentosLimpios.map((seg, idx) => {
    const to = '/' + segmentosLimpios.slice(0, idx + 1).join('/');
    const nombre =
      nameMap[seg] ||
      decodeURIComponent(seg.charAt(0).toUpperCase() + seg.slice(1));
    return { to, nombre };
  });

  return (
    <nav className="migasdepan" aria-label="breadcrumb">
      <ol className="migasdepan-list">
        {/*siempre Inicio al principio */}
        <li className="migasdepan-item">
          {segmentosLimpios.length > 0 ? (
            <Link to="/">Inicio</Link>
          ) : (
            <span>Inicio</span>
          )}
        </li>

        {/*mapeo las rutas para crear los enlaces */}
        {rutas.map((r, i) => (
          <li key={r.to} className="migasdepan-item">
            {i < rutas.length - 1 ? (
              <Link to={r.to}>{r.nombre}</Link>
            ) : (
              <span>{r.nombre}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
