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
          'nombre' => 'required',
          'email' => 'required|email|unique:usuarios,email',
          'password' => 'required|confirmed|min:6'
        ]);

        $usuario = Usuario::create([
          'nombre' => $r->nombre,
          'email' => $r->email,
          'password' => Hash::make($r->password),
          'tipo' => 'usuario'
        ]);

        return response()->json(['mensaje'=>'Usuario creado'], 201);
    }

    public function login(Request $r)
    {
        $r->validate(['email'=>'required|email', 'password'=>'required']);
        $usr = Usuario::where('email', $r->email)->firstOrFail();

        if (!Hash::check($r->password, $usr->password)) {
          return response()->json(['mensaje'=>'Credenciales inválidas'], 401);
        }

        $token = $usr->createToken('token-homebuy')->plainTextToken;
        return response()->json([
          'user' => $usr,
          'token'=> $token
        ]);
    }

    public function logout(Request $r)
    {
        $r->user()->currentAccessToken()->delete();
        return response()->json(['mensaje'=>'Desconectado']);
    }
}