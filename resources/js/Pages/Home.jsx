import React, { useState, useEffect } from 'react';
import api from '../services/api';
import HouseCard from '../components/HouseCard';
import '../../css/home.css';

export default function Home() {
  const [casas, setCasas] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCasas = async () => {
      try {
        // Ajusta la ruta si tu controlador responde en /api/houses o /api/casas
        const res = await api.get('/casas');
        // Asegurarnos de que `res.data` existe
        setCasas(res.data?.data ?? res.data);
      } catch (e) {
        console.error(e);
        setError('No se pudieron cargar las viviendas.');
      }
    };
    fetchCasas();
  }, []);

  if (error) {
    return <div className="home"><p className="home__error">{error}</p></div>;
  }

  if (casas === null) {
    return <div className="home"><p className="home__loading">Cargando viviendas…</p></div>;
  }

  return (
    <div className="home">
      <h1 className="home__title">Bienvenidos a HomeBuy</h1>
      <div className="home__grid">
        {casas.map(casa => (
          <HouseCard key={casa.id} casa={casa} />
        ))}
      </div>
    </div>
  );
}
