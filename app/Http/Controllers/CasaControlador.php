<?php
namespace App\Http\Controllers;

use App\Models\Casa;
use Illuminate\Http\Request;

class CasaControlador extends Controller
{
    public function index()
    {
        // Carga todas las casas y genera la URL pública de la imagen:
        $casas = Casa::all()->map(function($c) {
            return [
                'id'          => $c->id,
                'titulo'      => $c->titulo,
                'descripcion' => $c->descripcion,
                'precio'      => $c->precio,
                'direccion'   => $c->direccion,
                'estado'      => $c->estado,
                // Aquí asset() genera http://tu-dominio/storage/images/XXX.jpg
                'imagen'      => asset("storage/images/{$c->imagen}"),
            ];
        });

        return response()->json($casas);
    }
}
