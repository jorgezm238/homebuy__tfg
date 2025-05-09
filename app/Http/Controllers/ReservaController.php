<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\Compra;
use App\Models\Casa;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ReservaController extends Controller
{
    public function store(Request $request)
    {
        // 1) Validación:
        $data = $request->validate([
            'house_id' => [
                'required',
                'exists:casas,id',
                // única por usuario+casa
                Rule::unique('reservas')->where(fn($q) => $q->where('user_id', $request->user()->id)),
            ],
            'fianza'   => 'required|integer|min:50000',
        ], [
            'house_id.unique' => 'Ya tienes una reserva para esta casa.',
        ]);

        // 2) Crear la reserva
        $reserva = Reserva::create([
            'user_id'      => $request->user()->id,
            'house_id'     => $data['house_id'],
            'fianza'       => $data['fianza'],
            'fecha_inicio' => now(),
        ]);

        // 3) Marcar la casa como reservada
        $casa = Casa::findOrFail($data['house_id']);
        $casa->estado = 'reservada';
        $casa->save();

        // 4) Respuesta JSON
        return response()->json([
            'message' => 'Reserva creada y casa marcada como reservada',
            'reserva' => $reserva,
            'casa'    => $casa,
        ], 201);
    }
 public function index(Request $request)
    {
        $userId = $request->user()->id;
        $reservas = Reserva::where('user_id', $userId)
                    ->orderBy('fecha_inicio', 'desc')
                    ->get(['id', 'house_id', 'fianza', 'fecha_inicio']);
        return response()->json(['reservas' => $reservas], 200);
    }

    // 2) Borrar reserva y quizá liberar la casa
    public function destroy($id)
    {
        $reserva = Reserva::findOrFail($id);
        if ($reserva->user_id !== auth()->id()) {
            return response()->json(['message' => 'No autorizado'], 403);
        }
        $casaId = $reserva->house_id;
        $reserva->delete();
        $tieneOtros = Reserva::where('house_id', $casaId)->exists()
                        || Compra::where('house_id', $casaId)->exists();
        if (! $tieneOtros) {
            Casa::where('id', $casaId)->update(['estado' => 'disponible']);
        }
        return response()->json(['message'=>'Reserva eliminada'], 200);
    }

}
