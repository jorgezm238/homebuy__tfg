<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function show(Request $request)
    {
        $products_page = Product::with('productImagen')->with('category')->orderBy('id_product')->paginate(16);
        $categories = Category::all();

        $products = Product::with('productImagen')->with('category')->get();

        return Inertia::render('Welcome', [ 'productsPage' => $products_page, 'products' => $products, 'categories' => $categories ]);
    }
}
