<?php
// app/Http/Controllers/CasaControlador.php

namespace App\Http\Controllers;

use App\Models\Casa;
use App\Models\Reserva;
use App\Models\Compra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CasaControlador extends Controller
{
    /**
     * GET /api/casas
     * Ahora acepta q para filtrar por titulo o descripcion
     */
    public function index(Request $request)
    {
        // 1) Obtenemos el término de búsqueda
        $q = $request->query('q');

        // 2) Montamos la query base (con imágenes)
        $query = Casa::with('images');

        // 3) Si hay q, filtramos
        if ($q) {
            $query->where(function($sub) use ($q) {
                $sub->where('titulo', 'like', "%{$q}%")
                    ->orWhere('descripcion', 'like', "%{$q}%");
            });
        }

        // 4) Ejecutamos y mapeamos
        $casas = $query->get()->map(function($c) {
            return [
                'id'          => $c->id,
                'titulo'      => $c->titulo,
                'descripcion' => $c->descripcion,
                'precio'      => $c->precio,
                'direccion'   => $c->direccion,
                'estado'      => $c->estado,
                'imagen'      => asset("storage/images/{$c->imagen}"),
                'images'      => $c->images->map(fn($img) =>
                    asset("storage/images/{$img->ruta}")
                ),
            ];
        });

        return response()->json($casas, 200);
    }

    /**
     * GET /api/casas/{id}
     */
    public function show($id)
    {
        $c = Casa::with('images')->find($id);
        if (! $c) {
            return response()->json(['mensaje' => 'Propiedad no encontrada.'], 404);
        }

        return response()->json([
            'id'          => $c->id,
            'titulo'      => $c->titulo,
            'descripcion' => $c->descripcion,
            'precio'      => $c->precio,
            'direccion'   => $c->direccion,
            'estado'      => $c->estado,
            'imagen'      => asset("storage/images/{$c->imagen}"),
            'images'      => $c->images->map(fn($img) =>
                asset("storage/images/{$img->ruta}")
            ),
        ], 200);
    }

    /**
     * PATCH /api/casas/{id}
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'estado' => 'required|in:disponible,reservada,vendida',
        ]);

        try {
            DB::beginTransaction();

            $casa  = Casa::findOrFail($id);
            $nuevo = $data['estado'];
            $casa->estado = $nuevo;
            $casa->save();

            // 1) Si vuelve a “disponible”, borramos reservas y compras previas
            if ($nuevo === 'disponible') {
                Reserva::where('house_id', $id)->delete();
                Compra::where('house_id', $id)->delete();
            }

            // 2) Si lo marcamos “vendida”, convertimos la reserva (si la hay) en compra
            if ($nuevo === 'vendida') {
                $reserva = Reserva::where('house_id', $id)->first();
                if ($reserva) {
                    Compra::create([
                        'user_id'      => $reserva->user_id,
                        'house_id'     => $id,
                        'fecha_compra' => now(),
                    ]);
                    $reserva->delete();
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Estado actualizado correctamente.',
                'casa'    => $casa,
            ], 200);

        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Error al actualizar estado de casa', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'message' => 'Error interno al actualizar estado.'
            ], 500);
        }
    }
}
