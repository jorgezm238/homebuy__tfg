import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../services/api'     // Ajusta la ruta si tu cliente Axios está en otro sitio
import '../../css/contacto.css'      // Nuevo CSS para esta página

export default function Contacto() {
  // Si no hay token, redirigimos inmediatamente al login
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Hooks para los campos y estado
  const [casaId, setCasaId] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Aquí definimos el handleSubmit
  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      // Pedimos CSRF si usas Sanctum
      await api.get('/sanctum/csrf-cookie')
      // Enviamos al endpoint de contacto
      await api.post('/contacto', {
        casa_id: casaId,
        mensaje: mensaje
      })
      setSuccess('¡Mensaje enviado con éxito!')
      setCasaId('')
      setMensaje('')
    } catch (err) {
      setError('Error al enviar el mensaje.')
      console.error(err)
    }
  }

  return (
    <div className="contacto-page">
      <h2>Contacto</h2>

      {error && <div className="contacto-error">{error}</div>}
      {success && <div className="contacto-success">{success}</div>}

      <form onSubmit={handleSubmit} className="contacto-form">
        <label>Número de la casa</label>
        <input
          type="text"
          value={casaId}
          onChange={e => setCasaId(e.target.value)}
          placeholder="Ej. 123"
          required
        />

        <label>Mensaje</label>
        <textarea
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
          placeholder="Escribe aquí tu consulta..."
          required
        />

        <button type="submit">Enviar mensaje</button>
      </form>
    </div>
  )
}
