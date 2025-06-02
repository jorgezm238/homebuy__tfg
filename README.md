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

## 🧱 Migraciones y datos de ejemplo

Ejecuta las migraciones y carga los seeders con:

```bash
php artisan migrate:fresh --seed
```

Esto creará las tablas necesarias y añadirá datos iniciales como viviendas y usuarios de prueba.

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
- Frontend React → http://localhost:5173

---

## 🚀 Compilar para producción

Cuando finalices el desarrollo y estés listo para desplegar, genera la versión optimizada del frontend:

```bash
npm run build
```

Esto generará la carpeta `public/build` con los archivos listos para subir al servidor.

---

## 🛠 Tecnologías utilizadas

- **Laravel 10** – Backend PHP  
- **React 18** – Frontend SPA  
- **MySQL** – Base de datos relacional  
- **Vite** – Compilación del frontend  
- **Axios** – Comunicación entre frontend y API  
- **Bootstrap / CSS personalizado** – Estilo de la interfaz

---

## 👤 Autor

**Jorge Zardaín Monforte**  
Alumno de 2º DAW  
Trabajo Fin de Grado 2024-2025
