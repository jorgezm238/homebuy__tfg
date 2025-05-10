<?php
// app/Http/Controllers/CarritoController.php

namespace App\Http\Controllers;

use App\Models\Carrito;
use App\Models\CarritoItem;
use App\Models\Reserva;        // ← importamos Reserva
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
     * Añade un item con cantidad = 1, solo si el usuario ya reservó la casa.
     * Si ya existe en el carrito, devuelve 422.
     * Si no hay reserva previa, devuelve 403.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'house_id' => 'required|exists:casas,id',
        ]);

        $userId  = $request->user()->id;
        $houseId = $data['house_id'];

        // 0) Comprobamos que el usuario tiene una reserva activa para esta casa
        $tieneReserva = Reserva::where('user_id', $userId)
                               ->where('house_id', $houseId)
                               ->exists();

        if (! $tieneReserva) {
            return response()->json([
                'message' => 'Solo puedes añadir al carrito las casas que hayas reservado previamente.'
            ], 403);
        }

        // 1) Cabecera de carrito
        $carrito = Carrito::firstOrCreate(
            ['user_id' => $userId],
            ['creado_en' => now()]
        );

        // 2) Intentamos crear el item — si ya existe, 422
        $exists = CarritoItem::where('carrito_id', $carrito->id)
                             ->where('casa_id', $houseId)
                             ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Esta casa ya está en el carrito'
            ], 422);
        }

        // 3) Creamos el nuevo item
        $item = CarritoItem::create([
            'carrito_id' => $carrito->id,
            'casa_id'    => $houseId,
            'cantidad'   => 1,
        ]);

        // 4) Recargamos relación para devolver el carrito actualizado
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
