import React, { useEffect, useState } from 'react';
import HouseCard from '../components/HouseCard';
import '../../css/home.css';

export default function Home() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    // Aquí podrías llamar a tu API real
    // fetch('/api/houses').then(...).then(data=>setHouses(data));
    // Pero de momento usamos datos de ejemplo:
    setHouses([
      {
        id: 1,
        titulo: 'Chalet Central',
        estado: 'disponible',
        precio: 300000,
        imagen: 'https://via.placeholder.com/400x300?text=Chalet+Central'
      },
      {
        id: 2,
        titulo: 'Apartamento Playa',
        estado: 'reservada',
        precio: 150000,
        imagen: 'https://via.placeholder.com/400x300?text=Apt.+Playa'
      },
      {
        id: 3,
        titulo: 'Villa Moderna',
        estado: 'vendida',
        precio: 450000,
        imagen: 'https://via.placeholder.com/400x300?text=Villa+Moderna'
      },
      {
        id: 4,
        titulo: 'Casa Rural',
        estado: 'disponible',
        precio: 200000,
        imagen: 'https://via.placeholder.com/400x300?text=Casa+Rural'
      },
      {
        id: 5,
        titulo: 'Casa Rural',
        estado: 'disponible',
        precio: 200000,
        imagen: 'https://via.placeholder.com/400x300?text=Casa+Rural'
      },
      {
        id: 6,
        titulo: 'Casa Rural',
        estado: 'disponible',
        precio: 200000,
        imagen: 'https://via.placeholder.com/400x300?text=Casa+Rural'
      },
      {
        id: 7,
        titulo: 'Casa Rural',
        estado: 'disponible',
        precio: 200000,
        imagen: 'https://via.placeholder.com/400x300?text=Casa+Rural'
      },
      {
        id: 8,
        titulo: 'Casa Rural',
        estado: 'disponible',
        precio: 200000,
        imagen: 'https://via.placeholder.com/400x300?text=Casa+Rural'
      },
      {
        id: 9,
        titulo: 'Casa Rural',
        estado: 'disponible',
        precio: 200000,
        imagen: 'https://via.placeholder.com/400x300?text=Casa+Rural'
      },
      {
        id: 10,
        titulo: 'Casa Rural',
        estado: 'disponible',
        precio: 200000,
        imagen: 'https://via.placeholder.com/400x300?text=Casa+Rural'
      },
      {
        id: 11,
        titulo: 'Casa Rural',
        estado: 'disponible',
        precio: 200000,
        imagen: 'https://via.placeholder.com/400x300?text=Casa+Rural'
      },
      {
        id: 12,
        titulo: 'Casa Rural',
        estado: 'disponible',
        precio: 200000,
        imagen: 'https://via.placeholder.com/400x300?text=Casa+Rural'
      },
    ]);
  }, []);

  return (
    <div className="home-container">
      <h1>Casas Disponibles</h1>
      <div className="home-grid">
        {houses.map(h => (
          <HouseCard key={h.id} house={h} />
        ))}
      </div>
    </div>
  );
}
