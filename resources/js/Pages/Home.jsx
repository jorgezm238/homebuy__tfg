import React, { useEffect, useState } from 'react';
import api from '../services/api';
import HouseCard from '../components/HouseCard';
import '../../css/home.css';

export default function Home() {
  const [casas, setCasas] = useState([]);

  useEffect(() => {
    api.get('/casas')
      .then(res => {
        const raw = Array.isArray(res.data) 
          ? res.data 
          : Array.isArray(res.data.data) 
            ? res.data.data 
            : [];
        const conImagenes = raw.map(h => ({
          ...h,
          imagen: `/images/${h.imagen}`  // asumiendo que copiaste los JPG a public/images
        }));
        setCasas(conImagenes);
      })
      .catch(err => console.error('Error al cargar /api/casas:', err));
  }, []);

  return (
    <div className="home-container">
      <h1>Inmuebles Disponibles</h1>
      <div className="home-grid">
        {casas.map(h => <HouseCard key={h.id} house={h} />)}
      </div>
    </div>
  );
}
