<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// RUTAS PÚBLICAS
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// RUTAS PROTEGIDAS
Route::middleware('auth:sanctum')->group(function(){
    // Devuelve el usuario logueado
    Route::get('/user', function(Request $request){
      return $request->user();
    });
    // Cerrar sesión
    Route::post('/logout', [AuthController::class, 'logout']);
});
