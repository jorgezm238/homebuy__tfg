<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Devuelve la info del usuario (ya lo tenías en /api/user pero unificamos)
    public function show(Request $request)
    {
        return response()->json($request->user(), 200);
    }

    // Actualiza nombre y email
    public function update(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'nombre' => ['required','string','max:255'],
            'email'  => ['required','email','max:255',
                         Rule::unique('usuarios','email')->ignore($user->id)],
        ]);

        $user->update($data);

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'user'    => $user,
        ], 200);
    }

    // Cambia la contraseña, validando la actual
    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'current_password'      => ['required'],
            'password'              => ['required','string','min:8','confirmed'],
        ]);

        // Comprueba la contraseña actual
        if (! Hash::check($data['current_password'], $user->password)) {
            return response()->json(['message'=>'Contraseña actual incorrecta'], 422);
        }

        // Guarda la nueva
        $user->password = Hash::make($data['password']);
        $user->save();

        return response()->json(['message'=>'Contraseña cambiada correctamente'], 200);
    }
}
