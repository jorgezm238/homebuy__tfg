<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // Si la petición no espera JSON, redirigimos al login
        if (! $request->expectsJson()) {
            // Usamos url() para no depender de un nombre de ruta
            return url('/welcome');
        }
    
        return null;
    }
    
}
