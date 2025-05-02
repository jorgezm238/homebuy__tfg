<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function getProduct($product_id, Request $request) {
        $product_target = Product::with('productImagen')->with('category')->find($product_id);

        $products = Product::with('productImagen')->with('category')->get();
        $products_similars = $products
            ->filter(fn($product) => $product->id_category === $product_target->id_category)
            ->filter(fn($product) => $product->id_product !== $product_target->id_product)
            ->values();

        return Inertia::render('Products/Detail', [ 'product' => $product_target, 'productsSimilars' => $products_similars ]);
    }
}
