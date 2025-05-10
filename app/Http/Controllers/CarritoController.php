<?php
// app/Http/Controllers/CarritoController.php

namespace App\Http\Controllers;

use App\Models\Carrito;
use App\Models\CarritoItem;
use Illuminate\Http\Request;

class CarritoController extends Controller
{
    /**
     * GET /api/carrito
     */
    public function show(Request $request)
    {
        $userId = $request->user()->id;

        $carrito = Carrito::firstOrCreate(
            ['user_id' => $userId],
            ['creado_en' => now()]
        )->load('items.casa');

        return response()->json(['carrito' => $carrito], 200);
    }

    /**
     * POST /api/carrito
     * Añade un item con cantidad = 1. Si ya existe, devuelve error 422.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'house_id' => 'required|exists:casas,id',
        ]);

        $userId = $request->user()->id;

        // 1) Cabecera de carrito
        $carrito = Carrito::firstOrCreate(
            ['user_id' => $userId],
            ['creado_en' => now()]
        );

        // 2) Intentamos crear el item — si ya existe, 422
        $exists = CarritoItem::where('carrito_id', $carrito->id)
                             ->where('casa_id', $data['house_id'])
                             ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Esta casa ya está en el carrito'
            ], 422);
        }

        $item = CarritoItem::create([
            'carrito_id' => $carrito->id,
            'casa_id'    => $data['house_id'],
            'cantidad'   => 1,
        ]);

        // 3) Recargamos para devolver el carrito actualizado
        $carrito->load('items.casa');

        return response()->json([
            'message' => 'Casa añadida al carrito',
            'carrito' => $carrito,
            'item'    => $item,
        ], 201);
    }

    /**
     * DELETE /api/carrito/{id}
     */
    public function destroy(Request $request, $itemId)
    {
        $item = CarritoItem::findOrFail($itemId);

        if ($item->carrito->user_id !== $request->user()->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $item->delete();

        return response()->json(['message' => 'Item eliminado'], 200);
    }
}
