<?php

namespace App\Http\Controllers;

use App\Models\Casa;
use Illuminate\Http\Request;

class CasaControlador extends Controller
{
    /**
     * GET /api/casas
     * Devuelve el listado de casas con su imagen principal.
     */
    public function index()
    {
        $casas = Casa::all()->map(function($c) {
            return [
                'id'          => $c->id,
                'titulo'      => $c->titulo,
                'descripcion' => $c->descripcion,
                'precio'      => $c->precio,
                'direccion'   => $c->direccion,
                'estado'      => $c->estado,
                'imagen'      => asset("storage/images/{$c->imagen}"),
            ];
        });

        return response()->json($casas, 200);
    }

    /**
     * GET /api/casas/{id}
     * Devuelve una casa con TODAS sus imágenes.
     */
    public function show($id)
    {
        // Cargamos la casa junto con la relación images
        $c = Casa::with('images')->find($id);

        if (! $c) {
            return response()->json(['mensaje' => 'Propiedad no encontrada.'], 404);
        }

        // Convertimos cada ruta a URL absoluta
        $imagenes = $c->images->map(function($img) {
            return asset("storage/images/{$img->ruta}");
        });

        return response()->json([
            'id'          => $c->id,
            'titulo'      => $c->titulo,
            'descripcion' => $c->descripcion,
            'precio'      => $c->precio,
            'direccion'   => $c->direccion,
            'estado'      => $c->estado,
            'imagen'      => asset("storage/images/{$c->imagen}"),
            'images'      => $imagenes,
        ], 200);
    }
  public function update(Request $request, $id)
    {
        // 1) Buscar la casa
        $casa = Casa::findOrFail($id);

        // 2) Validar solo el estado
        $data = $request->validate([
            'estado' => 'required|in:disponible,reservada,vendida',
        ]);

        // 3) Asignar y guardar
        $casa->estado = $data['estado'];
        $casa->save();

        // 4) Responder con la casa actualizada
        return response()->json([
            'message' => 'Estado actualizado correctamente.',
            'casa'    => $casa,
        ]);
    }

}
