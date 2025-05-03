<?php



use Illuminate\Support\Facades\Route;

// ... cualquier otra ruta que tengas

// Ruta de inicio
//Route::get('/', [CasaControlador::class, 'index'])->name('home');
//Route::view('/{any}', 'app')->where('any','.*');
// routes/web.php



// Cualquier ruta va a nuestra SPA React
Route::view('/{any?}', 'app')->where('any', '.*');



// (Opcional) Borra o comenta la antigua ruta que apuntaba a Product
// Route::get('/', [WelcomeController::class, 'show']);


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|


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
*/