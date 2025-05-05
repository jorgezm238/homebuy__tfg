// resources/js/pages/Contacto.jsx
import React, { useState } from 'react'
export default function Contacto() {
  const [mensaje, setMensaje] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    // tu lógica de envío…
    alert('Mensaje enviado: '+ mensaje)
  }
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h2>Contacto</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Tu mensaje"
            value={mensaje}
            onChange={e=>setMensaje(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  )
}
