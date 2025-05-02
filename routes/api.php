<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/user', [AccountController::class, 'store']);
Route::post('/user/login', [AccountController::class, 'login']);

Route::middleware('auth:sanctum')->put('/user', [AccountController::class, 'update']);
Route::middleware('auth:sanctum')->get('/user/logout', [AccountController::class, 'logout']);

Route::middleware('auth:sanctum')->prefix('cart')->group(function () {
    Route::post('/', [CartController::class, 'store']);
});
