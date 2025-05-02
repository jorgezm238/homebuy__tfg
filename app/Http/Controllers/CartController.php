<?php

namespace App\Http\Controllers;

use App\Enums\CartStatus;
use App\Models\Cart;
use App\Models\CartProduct;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;

class CartController extends Controller
{
    public function show(Request $request) {
        return Inertia::render('Cart/Cart');
    }

    public function store(Request $request)
    {
        $request->validate([
            'status' => [new Enum(CartStatus::class)],
            'products' => 'required|array'
        ]);

        if (count($request->products) === 0) {
            return response()->json([
                'message' => 'No puede registrar un carro sin productos',
                'data' => null
            ], 400);
        }

        $current_user = $request->user();

        $cart = new Cart();
        $cart->status = $request->status;
        $cart->id_user = $current_user->id_user;
        $cart->save();

        $products = [];

        foreach ($request->products as $product) {
            $cart_product = new CartProduct();
            $cart_product->id_product = $product['id_product'];
            $cart_product->count_product = $product['count'];
            $cart_product->price_product = $product['price'];
            $cart_product->id_cart = $cart['id_cart'];
            $cart_product->save();

            array_push($products, $cart_product);
        }

        return response()->json([
            'message' => 'Orden realizada con exito',
            'data' => [
                'cart' => $cart,
                'cart_products' => $products
            ]
        ], 201);
    }

    public function orders(Request $request)
    {
        $current_user = $request->user();
        $carts = Cart::where('id_user', '=', $current_user->id_user)->with('cartProduct')->get();
        return Inertia::render('Order/Order', [ 'carts' => $carts ]);
    }

    public function getOrderById($id_cart, Request $request)
    {
        $current_user = $request->user();
        $cart = Cart::where('id_user', '=', $current_user->id_user)
            ->where('id_cart', '=', $id_cart)
            ->with('cartProduct')
            ->first();

        return Inertia::render('Order/Detail', [ 'cart' => $cart ]);
    }
}
