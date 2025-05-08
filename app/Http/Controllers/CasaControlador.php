<?php
namespace App\Http\Controllers;

use App\Models\Casa;
use Illuminate\Http\Request;

class CasaControlador extends Controller
{
    public function index()
    {
        // devuelve TODAS las casas sin joins complejos
        return response()->json(Casa::all());
    }
}
