import React, { useState, useEffect } from 'react';
import { useSearchParams }         from 'react-router-dom';
import api                         from '../services/api';
import '../../css/search.css';      // grid + house-card.css
import HouseCard                   from './HouseCard';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carga resultados
  useEffect(() => {
    setLoading(true);
    api.get('/casas', { params: { q } })
      .then(({ data }) => {
        // si tu API devuelve { casas: [...] }:
        setResults(data.casas || data);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [q]);

  // Forzar recarga del carrito / favoritos tras acciones
  const handleUpdate = () => {
    // por ejemplo, refrescar resultados para que llegue isFavorito/inCart actualizados
    api.get('/casas', { params: { q } })
      .then(({ data }) => setResults(data.casas || data))
      .catch(() => {});
  };

  return (
    <div className="search-results">
      <h2>Resultados de búsqueda: “{q}”</h2>

      {loading ? (
        <p>Cargando…</p>
      ) : results.length > 0 ? (
        <div className="results-grid">
          {results.map(house => (
            <HouseCard 
              key={house.id} 
              house={house} 
              onUpdate={handleUpdate} 
            />
          ))}
        </div>
      ) : (
        <p>No se han encontrado propiedades.</p>
      )}
    </div>
  );
}
