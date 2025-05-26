<?php

namespace App\Http\Controllers;

use App\Models\Casa;
use App\Models\Reserva;
use App\Models\Compra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CasaControlador extends Controller
{
    public function index(Request $request)
    {
        //obtenemos el término q de búsqueda
        $q = $request->query('q');

        //montamos la query base (con imagenes)
        $query = Casa::with('images');

        //ssi hay q, filtramos
        if ($q) {
            $query->where(function($sub) use ($q) {
                $sub->where('titulo', 'like', "%{$q}%")
                    ->orWhere('descripcion', 'like', "%{$q}%");
            });
        }

        //se ejecuta y se mapea el resultado
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

            //si vuelve a “disponible”, se borran las reservas y las compras previas
            if ($nuevo === 'disponible') {
                Reserva::where('house_id', $id)->delete();
                Compra::where('house_id', $id)->delete();
            }

            //si lo marcamos “vendida”, se convierte la reserva (si la hay) en compra
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
            //aqui hace un commit para que se guarden los cambios que hace el admin
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
