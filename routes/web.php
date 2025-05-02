<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WelcomeController;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [WelcomeController::class, 'show'])->name('welcome');
Route::get('/cart', [CartController::class, 'show']);

Route::get('/signup', [AccountController::class, 'signup']);

Route::prefix('products')->group(function () {
    Route::get('/{product_id}', [ProductController::class, 'getProduct'])->name('products.id');
});

Route::middleware('auth:sanctum')->get('/profile', [AccountController::class, 'profile']);

Route::middleware('auth:sanctum')->prefix('orders')->group(function () {
    Route::get('/', [CartController::class, 'orders']);
    Route::get('/{id_cart}', [CartController::class, 'getOrderById']);
});
