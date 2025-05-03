<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Casa extends Model
{
    use HasFactory;

    // Nombre de la tabla en BD
    protected $table = 'casas';

    // Campos asignables por mass-assignment
    protected $fillable = [
        'titulo',
        'descripcion',
        'precio',
        'direccion',
        'estado',
        'imagen',
        'agente_id',
    ];

    /**
     * Relación con el usuario (agente) que gestiona la casa
     */
    public function agente()
    {
        return $this->belongsTo(Usuario::class, 'agente_id');
    }
}
