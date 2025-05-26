<?php
namespace App\Http\Controllers;

use App\Models\Carrito;
use App\Models\CarritoItem;
use App\Models\Reserva;        
use Illuminate\Http\Request;

class CarritoController extends Controller
{

    public function show(Request $request)
    {
        $userId = $request->user()->id;

        $carrito = Carrito::firstOrCreate(
            ['user_id' => $userId],
            ['creado_en' => now()]
        )->load('items.casa');

        return response()->json(['carrito' => $carrito], 200);
    }

   
    public function store(Request $request)
    {
        $data = $request->validate([
            'house_id' => 'required|exists:casas,id',
        ]);

        $userId  = $request->user()->id;
        $houseId = $data['house_id'];

    
        $tieneReserva = Reserva::where('user_id', $userId)
                               ->where('house_id', $houseId)
                               ->exists();

        if (! $tieneReserva) {
            return response()->json([
                'message' => 'Solo puedes añadir al carrito las casas que hayas reservado previamente.'
            ], 403);
        }

        $carrito = Carrito::firstOrCreate(
            ['user_id' => $userId],
            ['creado_en' => now()]
        );

        $exists = CarritoItem::where('carrito_id', $carrito->id)
                             ->where('casa_id', $houseId)
                             ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Esta casa ya está en el carrito'
            ], 422);
        }

        $item = CarritoItem::create([
            'carrito_id' => $carrito->id,
            'casa_id'    => $houseId,
            'cantidad'   => 1,
        ]);

        $carrito->load('items.casa');

        return response()->json([
            'message' => 'Casa añadida al carrito',
            'carrito' => $carrito,
            'item'    => $item,
        ], 201);
    }

 
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
