import React, { useEffect, useState } from 'react';
import api from '../services/api';
import HouseCard from '../components/HouseCard';
import '../../css/home.css';

export default function Home() {
  const [casas, setCasas] = useState([]);

  useEffect(() => {
    api.get('/casas')
      .then(res => {
        if (Array.isArray(res.data)) {
          setCasas(res.data);
        } else {
          console.error('Formato inesperado /casas:', res.data);
        }
      })
      .catch(err => {
        console.error('Error cargando /casas:', err);
      });
  }, []);

  return (
    <div className="home-container">
      <h1>Inmuebles Disponibles</h1>
      <div className="home-grid">
        {casas.map(c => (
          <HouseCard key={c.id} house={c} />
        ))}
      </div>
    </div>
  );
}
