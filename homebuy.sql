-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2025 a las 19:02:22
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `homebuy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

CREATE TABLE `carritos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `carritos`
--

INSERT INTO `carritos` (`id`, `user_id`, `creado_en`) VALUES
(2, 1, '2025-05-10 10:52:40'),
(6, 7, '2025-05-19 09:19:52'),
(7, 8, '2025-05-27 08:36:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_items`
--

CREATE TABLE `carrito_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `carrito_id` bigint(20) UNSIGNED NOT NULL,
  `casa_id` bigint(20) UNSIGNED NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `casas`
--

CREATE TABLE `casas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `estado` enum('disponible','reservada','vendida') NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `agente_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `casas`
--

INSERT INTO `casas` (`id`, `titulo`, `descripcion`, `precio`, `direccion`, `estado`, `imagen`, `agente_id`, `created_at`, `updated_at`) VALUES
(1, 'Casa en Madrid', 'Esta casa de 120 m² en C/ Mayor 1 combina un salón-comedor diáfano con techo de madera y grandes ventanales que aportan mucha luz, una cocina semintegrada de diseño moderno, tres dormitorios (el principal con armario empotrado), un baño reformado con plato de ducha, suelos de parquet, calefacción de gas natural y carpintería blanca, todo en un entorno urbano tranquilo con todos los servicios al alcance.\n\n\n\n\n\n\n\n', 300000.00, 'C/ Mayor 1, Madrid', 'disponible', 'Dorsius.jpg', 1, NULL, '2025-06-02 14:57:37'),
(2, 'Piso en Gijón', 'Este luminoso piso en Av. Costa 5, Gijón, frente al mar, dispone de un salón–comedor con grandes ventanales y acceso a terraza panorámica, una cocina independiente equipada, un baño completo y suelos de tarima. Con carpintería exterior de aluminio y orientación marítima, ofrece un ambiente fresco y despejado, ideal para disfrutar de las vistas al Cantábrico sin renunciar a la comodidad de tener todos los servicios y transporte urbano al alcance.', 150000.00, 'Av. Costa 5, Gijón', 'disponible', 'Piso.jpg', 1, NULL, '2025-05-29 10:01:01'),
(3, 'Chalet en Cáceres', 'Este chalet independiente de estilo vanguardista en la tranquila C/ Moderna 12 de Logrosán (Cáceres) cuenta con unos 200 m² distribuidos en dos alturas, con una fachada de ladrillo vista, grandes ventanales que bañan de luz todas las estancias y vistas al jardín privado de unos 500 m². En planta baja ofrece un amplio salón con chimenea, cocina abierta de diseño minimalista y un aseo de cortesía; en la primera planta tres dormitorios dobles con armarios empotrados y dos baños completos, uno de ellos en suite. Dispone además de garaje cubierto, sistema de calefacción por radiadores, aire acondicionado y una espaciosa terraza-solárium, convirtiéndolo en la opción perfecta para quienes buscan confort, luz natural y un acabado contemporáneo en plena naturaleza.', 450000.00, 'C/ Moderna 12, Logrosán, Cáceres\n', 'disponible', 'Chalet.jpg', 1, NULL, '2025-05-29 10:01:06'),
(4, 'Ático en Gijón', 'Este ático moderno de aproximadamente 100 m² en Camino del Río 7 (Gijón) cuenta con un amplio salón-comedor de concepto abierto con grandes ventanales que inundan de luz cada rincón, una cocina americana totalmente equipada, dos dormitorios dobles y un baño completo. Sus suelos de tarima, la climatización por conductos y la carpintería exterior de aluminio garantizan confort y eficiencia, mientras que la gran terraza-solárium ofrece vistas panorámicas al mar y la ciudad. Ideal para quienes buscan combinar estilo urbano con momentos de relax al aire libre.', 600000.00, 'Cam. del Río 7, Gijón', 'disponible', 'Atico.jpg', 1, NULL, '2025-05-14 13:48:38'),
(5, 'Piso en Barcelona', 'Este luminoso piso de 80 m² en Passeig de Gràcia, 45 combina un salón-comedor con acceso a una terraza con vistas a la ciudad, dos dormitorios dobles y un baño completo, todo con suelos de parquet y carpintería de aluminio con doble acristalamiento. La cocina, totalmente equipada con electrodomésticos integrados, se integra discretamente al espacio principal, mientras que el aire acondicionado por conductos garantiza confort durante todo el año. Situado en pleno Eixample, ofrece un estilo de vida urbano con boutiques, restaurantes y transporte público a pocos pasos.', 250000.00, 'Passeig de Gràcia, 45, Barcelona', 'disponible', 'PisoBarcelona.jpg', 1, '2025-05-15 09:37:09', '2025-05-15 09:37:09'),
(6, 'Piso en Madrid', 'Este acogedor piso de unos 90 m² en Calle Gran Vía, 27 cuenta con un salón luminoso gracias a sus amplias ventanas, dos dormitorios espaciosos y un baño completo reformado. La cocina independiente, equipada con electrodomésticos modernos, se conecta al salón mediante un práctico office. Suelos de tarima y carpintería exterior con doble acristalamiento garantizan confort acústico y térmico. Situado en pleno centro de Madrid, ofrece acceso inmediato a transporte público, comercios y ocio, ideal para disfrutar de la vida urbana.\n', 300000.00, 'Calle Gran Vía, 27, Madrid', 'disponible', 'PisoMadrid.jpg', 1, '2025-05-15 09:37:09', '2025-05-15 09:37:09'),
(7, 'Casa adosada en Valencia', 'Esta cómoda casa adosada de 150 m² en Calle Los Olivos, 15 (Valencia) disfruta de un salón abierto al jardín privado de césped, perfecto para veladas al aire libre junto a la zona de barbacoa y terraza; cuenta con cocina moderna totalmente equipada, tres dormitorios (el principal con baño en suite), un baño adicional y un aseo de cortesía. Con suelos de gres imitación madera, ventanas de doble acristalamiento, calefacción por radiadores y garaje en planta baja, se ubica en una urbanización tranquila con piscina y zonas verdes, ofreciendo máxima privacidad y fácil acceso a colegios y comercios.', 450000.00, 'Calle Los Olivos, 15, Valencia', 'disponible', 'CasaAdosada.jpg', 1, '2025-05-15 09:37:09', '2025-05-15 09:37:09'),
(8, 'Casa Adosada en Alicante', 'Santa Pola\n\nExcelente promoción de viviendas adosadas.\n\nUbicada en Gran Alacant junto a la Playa de los Arenales, a tan solo 4km. del aeropuerto y 10km. de Alicante. Muy cerca se encuentra la Playa de Los Arenales del Sol donde podrá disfrutar de una agradable temperatura mediterránea durante todo el año.\n\nA escasos metros hay un completo centro comercial, en el que poder realizar sus compras.\n\n\n', 320000.00, 'C/ ', 'disponible', 'CasaAdosadaMonte.jpg', 1, '2025-05-22 14:42:49', '2025-05-22 12:52:17'),
(9, 'Ático en Mallorca', 'Ofrecemos EN EXCLUSIVA esta completísima vivienda tipo ático con terraza solárium de 80 m² con piscina privada y una barbacoa de obra dónde disfrutar de su día a día con sus seres queridos.\n\nVivienda en una pequeña edificación de tan solo una altura; muy luminosa en su totalidad con vistas panorámicas a las montañas que se vende con una plaza de aparcamiento y un trastero incluidos.', 570000.00, 'Av.', 'disponible', 'AticoXigala.jpg', 1, '2025-05-22 14:42:49', '2025-05-22 14:42:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `casa_imagenes`
--

CREATE TABLE `casa_imagenes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `casa_id` bigint(20) UNSIGNED NOT NULL,
  `ruta` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `casa_imagenes`
--

INSERT INTO `casa_imagenes` (`id`, `casa_id`, `ruta`, `created_at`, `updated_at`) VALUES
(1, 1, 'Dorsius.jpg', '2025-05-10 14:42:48', '2025-05-10 14:42:48'),
(2, 1, 'Dorsius3.avif', '2025-05-10 14:42:48', '2025-05-10 14:42:48'),
(3, 1, 'Dorsius2.avif', '2025-05-10 14:42:48', '2025-05-10 14:42:48'),
(4, 2, 'Piso.jpg', '2025-05-10 14:42:48', '2025-05-10 14:42:48'),
(5, 2, 'Piso2.avif', '2025-05-10 14:42:48', '2025-05-10 14:42:48'),
(6, 2, 'Piso3.avif', '2025-05-10 14:42:48', '2025-05-10 14:42:48'),
(7, 3, 'Chalet.jpg', '2025-05-10 14:42:48', '2025-05-10 14:42:48'),
(8, 3, 'Challet2.avif', '2025-05-10 14:42:48', '2025-05-10 14:42:48'),
(9, 3, 'Challet3.avif', '2025-05-10 14:42:48', '2025-05-10 14:42:48'),
(10, 4, 'Atico.jpg', '2025-05-10 14:42:48', '2025-05-10 14:42:48'),
(11, 4, 'Atico2.avif', '2025-05-10 14:42:48', '2025-05-10 14:42:48'),
(12, 4, 'Atico3.avif', '2025-05-10 14:42:48', '2025-05-10 14:42:48'),
(13, 5, 'PisoBarcelona.avif', '2025-05-15 09:41:10', '2025-05-15 09:41:10'),
(14, 5, 'PisoBarcelona2.avif', '2025-05-15 09:41:10', '2025-05-15 09:41:10'),
(15, 5, 'PisoBarcelona3.avif', '2025-05-15 09:41:10', '2025-05-15 09:41:10'),
(16, 6, 'PisoMadrid.avif', '2025-05-15 09:41:10', '2025-05-15 09:41:10'),
(17, 6, 'PisoMadrid2.avif', '2025-05-15 09:41:10', '2025-05-15 09:41:10'),
(18, 7, 'CasaAdosada2.avif', '2025-05-15 09:41:10', '2025-05-15 09:41:10'),
(19, 7, 'CasaAdosada3.avif', '2025-05-15 09:41:10', '2025-05-15 09:41:10'),
(20, 9, 'AticoXigala2.avif', '2025-05-22 14:48:52', '2025-05-22 14:48:52'),
(21, 9, 'AticoXigala3.avif', '2025-05-22 14:48:52', '2025-05-22 14:48:52'),
(22, 8, 'CasaAdosadaMonte2.avif', '2025-05-22 14:48:52', '2025-05-22 14:48:52'),
(23, 8, 'CasaAdosadaMonte3.avif', '2025-05-22 14:48:52', '2025-05-22 14:48:52'),
(24, 9, 'AticoXigala.jpg', '2025-05-22 14:50:04', '2025-05-22 14:50:04'),
(25, 8, 'CasaAdosadaMonte.jpg', '2025-05-22 14:50:04', '2025-05-22 14:50:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `house_id` bigint(20) UNSIGNED NOT NULL,
  `fecha_compra` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `house_id` bigint(20) UNSIGNED NOT NULL,
  `mensaje` text NOT NULL,
  `tipo` enum('informacion','visita','consulta') NOT NULL DEFAULT 'informacion' COMMENT 'Tipo de solicitud: informacion, visita o consulta',
  `fecha_contacto` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id`, `user_id`, `house_id`, `mensaje`, `tipo`, `fecha_contacto`) VALUES
(1, 1, 1, 'Cuando podemos quedar', 'visita', '2025-05-09'),
(2, 1, 1, 'aa', 'visita', '2025-05-09'),
(6, 1, 1, 'aaaa', 'informacion', '2025-05-19'),
(7, 1, 1, 'a', 'informacion', '2025-06-02'),
(8, 1, 1, 'aa', 'informacion', '2025-06-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `house_id` bigint(20) UNSIGNED NOT NULL,
  `fecha_guardado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`id`, `user_id`, `house_id`, `fecha_guardado`) VALUES
(19, 1, 1, '2025-05-26 12:36:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_05_02_000000_create_usuarios_table', 1),
(6, '2025_05_02_000001_create_carritos_table', 1),
(7, '2025_05_02_000002_create_casas_table', 1),
(8, '2025_05_02_000003_create_carrito_items_table', 1),
(9, '2025_05_02_000004_create_contactos_table', 2),
(10, '2025_05_02_000005_create_favoritos_table', 2),
(11, '2025_05_02_000006_create_reservas_table', 2),
(12, '2025_05_03_160601_agregar_updated_at_a_usuarios_table', 2),
(13, '2025_05_09_125603_make_fecha_fin_nullable_on_reservas_table', 3),
(15, '2025_05_09_131152_add_timestamps_to_casas_table', 4),
(16, '2025_05_09_132149_create_delete_triggers_for_reservas_and_compras', 5),
(17, '2025_05_09_132920_create_compras_table', 6),
(19, '2025_05_10_000010_create_casa_imagenes_table', 7),
(20, '2025_05_31_130553_add_foreign_keys_to_compras_table', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\Usuario', 3, 'token-homebuy', 'be28ce37f9c1dc8be24537badfff284d86b9a40c14154af0f4b0b3fbf28d8036', '[\"*\"]', '2025-05-06 09:08:41', NULL, '2025-05-06 09:08:39', '2025-05-06 09:08:41'),
(3, 'App\\Models\\Usuario', 1, 'token-homebuy', '86897c3baf8eaada1348461fffd257b67020a7ec6e45158232cf00ecf9946464', '[\"*\"]', '2025-05-06 17:57:54', NULL, '2025-05-06 17:51:56', '2025-05-06 17:57:54'),
(4, 'App\\Models\\Usuario', 1, 'token-homebuy', '76bdf378af2ede0b480b74f23a08a0fca7cd103198113fb1718db484f91b0a91', '[\"*\"]', '2025-05-06 18:57:05', NULL, '2025-05-06 17:58:19', '2025-05-06 18:57:05'),
(5, 'App\\Models\\Usuario', 1, 'token-homebuy', 'b4cc3fac6eec0a44086929bbbe7566bffafe8e0aa780b770d613c78114878187', '[\"*\"]', '2025-05-06 19:02:33', NULL, '2025-05-06 19:01:58', '2025-05-06 19:02:33'),
(6, 'App\\Models\\Usuario', 1, 'token-homebuy', '3f8d93de0f78bc0a65e652ed7fac0a7e3e836be38941ab880abeee2d464d3327', '[\"*\"]', '2025-05-06 19:03:31', NULL, '2025-05-06 19:02:46', '2025-05-06 19:03:31'),
(7, 'App\\Models\\Usuario', 3, 'token-homebuy', '39f419ea06062ac0dc18e6db15ea4102ddbceaee9a6d2d10921433f449e9de66', '[\"*\"]', '2025-05-06 19:04:57', NULL, '2025-05-06 19:04:54', '2025-05-06 19:04:57'),
(8, 'App\\Models\\Usuario', 1, 'token-homebuy', '43dc285112d98aa5b4155985418f415835e7f3f50f480f79ec6f775b831d3e68', '[\"*\"]', NULL, NULL, '2025-05-06 19:08:10', '2025-05-06 19:08:10'),
(9, 'App\\Models\\Usuario', 1, 'token-homebuy', '044678607c32351a043080bc91679fe8ac4b5708eb4d5176d0a1885f5851eee9', '[\"*\"]', '2025-05-06 19:08:13', NULL, '2025-05-06 19:08:11', '2025-05-06 19:08:13'),
(10, 'App\\Models\\Usuario', 1, 'token-homebuy', 'c1f69e49677c438b69965dcd79dcd1b8dba28f4d2679aeb1a023279e27e103ad', '[\"*\"]', NULL, NULL, '2025-05-08 15:43:09', '2025-05-08 15:43:09'),
(11, 'App\\Models\\Usuario', 1, 'token-homebuy', '0ac76c94dc61036aa6cdb767eb81a183ddcb826f300af723e2e60eac540beba1', '[\"*\"]', '2025-05-08 16:12:57', NULL, '2025-05-08 15:43:10', '2025-05-08 16:12:57'),
(12, 'App\\Models\\Usuario', 1, 'token-homebuy', '64787cf1c0e1226f4e447bff302c607cca77de9c89d7fd13e08406717ef55924', '[\"*\"]', NULL, NULL, '2025-05-08 16:24:22', '2025-05-08 16:24:22'),
(13, 'App\\Models\\Usuario', 1, 'token-homebuy', 'ef3880473511152776b4d6f2a31808285c7b12b969ffc8a684a71a0a3fb16465', '[\"*\"]', NULL, NULL, '2025-05-08 16:28:32', '2025-05-08 16:28:32'),
(14, 'App\\Models\\Usuario', 1, 'token-homebuy', '6bd95cf9661a870c8b24814c19c1dbc9b40e3bc51306079ce77eb0692b25ed74', '[\"*\"]', NULL, NULL, '2025-05-08 16:28:55', '2025-05-08 16:28:55'),
(63, 'App\\Models\\Usuario', 1, 'token-homebuy', 'dd84c414c3c4131cba6719309a97e7bfdd9437024dddd2121ffbf3c57868f7bf', '[\"*\"]', '2025-05-23 16:58:23', NULL, '2025-05-23 16:57:58', '2025-05-23 16:58:23'),
(69, 'App\\Models\\Usuario', 1, 'token-homebuy', 'edbbda96e4d927cda24226dfebba4e79250b0f194c785542a24b475f31956089', '[\"*\"]', '2025-05-29 10:00:50', NULL, '2025-05-28 17:58:03', '2025-05-29 10:00:50'),
(70, 'App\\Models\\Usuario', 1, 'token-homebuy', '71615d2fad55618971c25509dacaeee821887f2faf2ee5c16fdeccb5d1a5e8e9', '[\"*\"]', '2025-05-29 10:12:25', NULL, '2025-05-29 10:00:55', '2025-05-29 10:12:25'),
(71, 'App\\Models\\Usuario', 1, 'token-homebuy', 'eb1799b94aaa8ea2a583723974ee4598280eee737376c06434ca3184822050ba', '[\"*\"]', '2025-06-01 13:27:13', NULL, '2025-06-01 13:27:12', '2025-06-01 13:27:13'),
(72, 'App\\Models\\Usuario', 1, 'token-homebuy', 'caf202403823aee71d538574054c22467bc279f6dcdab2157b5db0a111aea243', '[\"*\"]', '2025-06-01 13:27:35', NULL, '2025-06-01 13:27:13', '2025-06-01 13:27:35'),
(73, 'App\\Models\\Usuario', 1, 'token-homebuy', '00a7c2a95cdb64689d96796ac5279f3d741a0b79b852b4e8ac3e3f19dc14d4a7', '[\"*\"]', '2025-06-02 14:57:39', NULL, '2025-06-02 14:55:27', '2025-06-02 14:57:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `house_id` bigint(20) UNSIGNED NOT NULL,
  `fianza` decimal(10,2) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo` enum('admin','usuario','invitado') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `tipo`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@homebuy.com', '$2y$10$umRp.FM1EIts5Mk8Bsb7we77gbKZBfZdNSvzJFeDdQCDfayrIi8AG', 'admin', '2025-05-06 09:07:32', '2025-05-10 15:08:25'),
(4, 'Lucas', 'lucas@homebuy.com', '$2y$10$7a39FxL1P2sveTV6IqMa9.s3jJXztLW3OUna0/sHoxEq8G/nx7oUe', 'usuario', '2025-05-08 16:48:50', '2025-05-08 16:48:50'),
(7, 'Pablo', 'pablo@homebuy.com', '$2y$10$RzR/8mdHkI5gLX3nh5mgPeeX7HIHUzz8ZkJmh0bwYDioOGJGhstu2', 'usuario', '2025-05-19 09:19:42', '2025-05-19 09:19:42'),
(8, 'Sergio', 'sergio@homebuy.com', '$2y$10$VSo/Paa2heVli49QBVZM1.KtZULg436tXmIZyPwLHVB1quJPyjSSW', 'usuario', '2025-05-27 08:32:01', '2025-05-27 08:32:01');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carritos_user_id_foreign` (`user_id`);

--
-- Indices de la tabla `carrito_items`
--
ALTER TABLE `carrito_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carrito_items_carrito_id_foreign` (`carrito_id`),
  ADD KEY `carrito_items_casa_id_foreign` (`casa_id`);

--
-- Indices de la tabla `casas`
--
ALTER TABLE `casas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `casas_agente_id_foreign` (`agente_id`);

--
-- Indices de la tabla `casa_imagenes`
--
ALTER TABLE `casa_imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `casa_imagenes_casa_id_foreign` (`casa_id`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `compras_user_id_foreign` (`user_id`),
  ADD KEY `compras_house_id_foreign` (`house_id`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contactos_user_id_foreign` (`user_id`),
  ADD KEY `contactos_house_id_foreign` (`house_id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favoritos_user_id_foreign` (`user_id`),
  ADD KEY `favoritos_house_id_foreign` (`house_id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservas_user_id_foreign` (`user_id`),
  ADD KEY `reservas_house_id_foreign` (`house_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `user_email_unique` (`email`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuarios_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `carrito_items`
--
ALTER TABLE `carrito_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `casas`
--
ALTER TABLE `casas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `casa_imagenes`
--
ALTER TABLE `casa_imagenes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id_user` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD CONSTRAINT `carritos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `carrito_items`
--
ALTER TABLE `carrito_items`
  ADD CONSTRAINT `carrito_items_carrito_id_foreign` FOREIGN KEY (`carrito_id`) REFERENCES `carritos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carrito_items_casa_id_foreign` FOREIGN KEY (`casa_id`) REFERENCES `casas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `casas`
--
ALTER TABLE `casas`
  ADD CONSTRAINT `casas_agente_id_foreign` FOREIGN KEY (`agente_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `casa_imagenes`
--
ALTER TABLE `casa_imagenes`
  ADD CONSTRAINT `casa_imagenes_casa_id_foreign` FOREIGN KEY (`casa_id`) REFERENCES `casas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_house_id_foreign` FOREIGN KEY (`house_id`) REFERENCES `casas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compras_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD CONSTRAINT `contactos_house_id_foreign` FOREIGN KEY (`house_id`) REFERENCES `casas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contactos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_house_id_foreign` FOREIGN KEY (`house_id`) REFERENCES `casas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favoritos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_house_id_foreign` FOREIGN KEY (`house_id`) REFERENCES `casas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
