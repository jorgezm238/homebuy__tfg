<?php

namespace App\Http\Controllers;

use App\Models\Favorito;
use Illuminate\Http\Request;

class FavoritoController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $favoritos = Favorito::with('casa')
            ->where('user_id', $userId)
            ->get();

        return response()->json(['favoritos' => $favoritos], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'house_id' => 'required|exists:casas,id',
        ]);

        $userId = $request->user()->id;

        if (Favorito::where('user_id', $userId)->where('house_id', $data['house_id'])->exists()) {
            return response()->json(['message' => 'Ya es favorito'], 422);
        }

        $favorito = Favorito::create([
            'user_id'       => $userId,
            'house_id'      => $data['house_id'],
            'fecha_guardado'=> now(),
        ]);

        return response()->json([
            'message'  => 'Añadido a favoritos',
            'favorito' => $favorito,
        ], 201);
    }

    public function destroy(Request $request, $id)
    {
        $favorito = Favorito::findOrFail($id);

        if ($favorito->user_id !== $request->user()->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $favorito->delete();

        return response()->json(['message' => 'Eliminado de favoritos'], 200);
    }
}
