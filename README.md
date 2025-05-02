
# Simple Online Store :department_store:

Simple online store is an e-commerce made in Laravel + React 👨‍💻. 

![Simple Online Store Website](https://user-images.githubusercontent.com/48531350/272439408-19967cbc-64f3-4d31-9c0f-e469a476d25f.png)

## Features
- Show products and filters 🛍️
- Cart Shopping 🛒
- Signin and Signup ✏️

![Simple Online Store Website](https://user-images.githubusercontent.com/48531350/272437822-fbe5fbe9-3d7a-4a45-b882-dc0e596e04a0.png)

## Install
Steps for download and instalation

### Requirements
- PHP 8.1
- Laravel
- MySql
- Composer
- NPM

### Download

download zip or clone project
```bash
git clone https://github.com/diegoalbert27/simple-online-store.git
```

### Install Dependencies
```bash
composer install
```
After
```bash
npm install
```

### Add credentials database
.env.example rename as .env
```text
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=simple-online-store
DB_USERNAME=root
DB_PASSWORD=
```

### Generate key for project
```bash
php artisan key:generate
```

### Execute migrations for database with seeders
```bash
php artisan migrate:refresh --seed
```

### Run server development with artisan
```bash
php artisan serve
```

### Run server vite with react
```bash
npm run dev
```

### Build React App
```bash
npm run build
```

## Acknowledgements
This personal project was development for the education and learning 🧠.

MIT License

Made with ❤️
