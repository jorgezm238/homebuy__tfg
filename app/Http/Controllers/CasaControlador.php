<?php
namespace App\Http\Controllers;

use App\Models\Casa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CasaControlador extends Controller
{
    // Listado ya lo tienes; sólo añado el método show:
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
        return response()->json($casas);
    }

    // Nuevo: detalle de una sola casa
    public function show($id)
    {
        $c = Casa::find($id);
        if (!$c) {
            return response()->json(['mensaje'=>'Propiedad no encontrada.'], 404);
        }
        return response()->json([
            'id'          => $c->id,
            'titulo'      => $c->titulo,
            'descripcion' => $c->descripcion,
            'precio'      => $c->precio,
            'direccion'   => $c->direccion,
            'estado'      => $c->estado,
            'imagen'      => asset("storage/images/{$c->imagen}"),
        ]);
    }
}
