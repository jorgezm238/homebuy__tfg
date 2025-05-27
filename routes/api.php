<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CasaControlador;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FavoritoController;
use App\Http\Controllers\CarritoController;

//RUTAS DE LA API

//registro y login publicos
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

//casas publicas
Route::get('/casas', [CasaControlador::class, 'index']);
Route::get('/casas/{id}', [CasaControlador::class, 'show']);

//rutas que requieren token de autenticacion
Route::middleware('auth:sanctum')->group(function(){

    //datos del usuario
    Route::get('/user',    fn(Request $r) => $r->user());
    Route::post('/logout', [AuthController::class, 'logout']);

    //contacto
    Route::post('/contacto', [ContactoController::class, 'store']);

    //favoritos
    Route::get('/favoritos',          [FavoritoController::class, 'index']);
    Route::post('/favoritos',         [FavoritoController::class, 'store']);
    Route::delete('/favoritos/{id}',  [FavoritoController::class, 'destroy']);

    //carrito
    Route::get('/carrito',            [CarritoController::class, 'show']);
    Route::post('/carrito',           [CarritoController::class, 'store']);
    Route::delete('/carrito/{itemId}',[CarritoController::class, 'destroy']);

    //perfil de usuario
    Route::get('/user',               [UserController::class, 'show']);
    Route::put('/user',               [UserController::class, 'update']);
    Route::put('/user/password',      [UserController::class, 'updatePassword']);

    //reservas
    Route::get('/reservas',           [ReservaController::class, 'index']);
    Route::post('/reservas',          [ReservaController::class, 'store']);
    Route::delete('/reservas/{id}',   [ReservaController::class, 'destroy']);

    //compras
    Route::get('/compras',            [CompraController::class, 'index']);
    Route::post('/compras',           [CompraController::class, 'store']);
    Route::delete('/compras/{id}',    [CompraController::class, 'destroy']);

    //gestión de stock (solo admin)
    Route::patch('/casas/{id}',       [CasaControlador::class, 'update']);
});
