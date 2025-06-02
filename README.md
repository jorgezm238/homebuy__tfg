# 🏠 HomeBuy

Plataforma web para gestionar la búsqueda, reserva y compra de viviendas de forma rápida y sencilla. Este proyecto ha sido desarrollado como Trabajo de Fin de Grado del ciclo de Desarrollo de Aplicaciones Web (DAW), combinando Laravel para el backend y React para el frontend.

---

## 📌 Requisitos previos

Antes de empezar, asegúrate de tener instalado:

- PHP 8.1 o superior  
- MySQL 5.7 o superior  
- Composer  
- Node.js y npm  
- Vite

---

## 📦 Clonar el repositorio

```bash
git clone https://github.com/jorgezm238/homebuy__tfg.git
cd homebuy__tfg
```

---

## 📚 Instalación de dependencias

### Laravel (backend)

```bash
composer install
```

### React (frontend)

```bash
npm install
```

---

## ⚙️ Configuración del entorno

Duplica el archivo `.env.example` y renómbralo como `.env`:

```bash
cp .env.example .env
```

A continuación, edita el archivo `.env` con tus datos de conexión a la base de datos:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homebuy
DB_USERNAME=root
DB_PASSWORD=
```

---

## 🔑 Generar la clave de la aplicación

```bash
php artisan key:generate
```

---

```bash
php artisan storage:link
```
HAZ ESTO SOLO SI NO SE VEN LAS IMAGENES, SI SE VEN NO HAGAS NADA SOLO CON EL LINK SIRVE

 Primero haces un ctrl + shift + P y escribes "Reload Window" y le das a enter pero solo ¡¡Si no te funciona en comando!!
 Sino pones el comando y luego copias la carpeta images de /storage/app/public/images y la pegas en public/storage
---

## 🧪 Puesta en marcha en desarrollo

Asegúrate de tener Apache y MySQL ejecutándose (puedes usar XAMPP o Laragon) y luego abre **dos terminales**:

### 1️⃣ Inicia el backend de Laravel:

```bash
php artisan serve
```

### 2️⃣ Inicia el frontend de React:

```bash
npm run dev
```

---

## 🌐 Accede a la aplicación

- API Laravel → http://localhost:8000  
---

## 👤 Autor

**Jorge Zardaín Monforte**  
Alumno de 2º DAW  
Trabajo Fin de Grado 2024-2025
