<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contacto;

class ContactoController extends Controller
{
    public function store(Request $r)
    {
        $r->validate([
            'casa_id' => 'required|integer|exists:casas,id',
            'tipo'    => 'required|in:informacion,visita,consulta',
            'mensaje' => 'required|string',
        ]);

        $contacto = Contacto::create([
            'user_id'       => $r->user()->id,
            'house_id'      => $r->casa_id,
            'tipo'          => $r->tipo,
            'mensaje'       => $r->mensaje,
            'fecha_contacto'=> now()->toDateString(),
        ]);

        return response()->json([
            'mensaje'  => 'Solicitud de contacto enviada correctamente',
            'contacto' => $contacto
        ], 201);
    }
}
