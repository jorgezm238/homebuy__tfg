<?php

namespace App\Http\Controllers;

use App\Models\Casa;
use Illuminate\Http\Request;
use Inertia\Inertia;              // si usas Inertia + React

class CasaControlador extends Controller
{
    /**
     * Muestra la página de inicio con las casas paginadas.
     */
    public function index(Request $request)
    {
        // Trae las casas con su agente, ordenadas por id desc, paginadas de 12 en 12
        $casasPaginadas = Casa::with('agente')
                              ->orderBy('id', 'desc')
                              ->paginate(12);

        // Envia a la vista Inertia 'Home' el array 'casas'
        return Inertia::render('Home', [
            'casas' => $casasPaginadas
        ]);
    }
}
