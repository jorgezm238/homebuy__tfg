<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CasaControlador;
use App\Http\Controllers\ContactoController;

// → Registro y login siguen siendo públicos
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// ← GET /api/casas es ahora **público**, no requiere token
Route::get('/casas', [CasaControlador::class, 'index']);

// → Rutas que SÍ necesitan token
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user',      fn(Request $r)=> $r->user());
    Route::post('/contacto', [ContactoController::class, 'store']);
    Route::post('/logout',   [AuthController::class, 'logout']);
});
