<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Reserva;
use App\Models\Casa;
use Illuminate\Http\Request;

class CompraController extends Controller
{
    //devuelve las compras del usuario autenticado
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $compras = Compra::where('user_id', $userId)
                   ->orderBy('fecha_compra', 'desc')
                   ->get(['id', 'house_id', 'fecha_compra']);

        return response()->json([
            'compras' => $compras,
        ], 200);
    }

    //crea una nueva compra y marca la casa como vendida
    public function store(Request $request)
    {
        $data = $request->validate([
            'house_id' => 'required|exists:casas,id',
        ]);

        $compra = Compra::create([
            'user_id'      => $request->user()->id,
            'house_id'     => $data['house_id'],
            'fecha_compra' => now(),
        ]);

        Casa::where('id', $data['house_id'])
            ->update(['estado' => 'vendida']);

        return response()->json([
            'message' => 'Compra registrada y casa marcada como vendida',
            'compra'  => $compra,
        ], 201);
    }

    //elimina una compra y actualiza el estado de la casa
    public function destroy($id)
    {
        $compra = Compra::findOrFail($id);

        if ($compra->user_id !== auth()->id()) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $casaId = $compra->house_id;
        $compra->delete();

        $tieneOtros = Reserva::where('house_id', $casaId)->exists()
                        || Compra::where('house_id', $casaId)->exists();

        if (! $tieneOtros) {
            Casa::where('id', $casaId)->update(['estado' => 'disponible']);
        }

        return response()->json(['message'=>'Compra eliminada'], 200);
    }
}
