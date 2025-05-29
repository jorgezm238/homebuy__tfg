<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $r)
    {
        $r->validate([
            'nombre'   => 'required',
            'email'    => 'required|email|unique:usuarios,email',
            'password' => 'required|confirmed|min:6'
        ]);

        $usuario = Usuario::create([
            'nombre'   => $r->nombre,
            'email'    => $r->email,
            'password' => Hash::make($r->password),
            'tipo'     => 'usuario'
        ]);

        return response()->json([
            'message' => 'Usuario creado correctamente'
        ], 201);
    }

    public function login(Request $r)
    {
        $r->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        //buscamos el usuario por email
        $usr = Usuario::where('email', $r->email)->first();

        if (!$usr || !Hash::check($r->password, $usr->password)) {
            return response()->json([
                'message' => 'Usuario o contraseña incorrectas'
            ], 401);
        }

        //crea un token de acceso
        $token = $usr->createToken('token-homebuy')->plainTextToken;

        //devolvemos el usuario y el token para el cliente
        return response()->json([
            'user'  => [
                'id'     => $usr->id,
                'nombre' => $usr->nombre,
                'email'  => $usr->email,
                'tipo'   => $usr->tipo,
            ],
            'token' => $token
        ]);
    }

    public function logout(Request $r)
    {
        //se elimina el token actual del usuario
        $r->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Desconectado correctamente'
        ]);
    }
}
