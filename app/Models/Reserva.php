<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    public $timestamps = false; // si solo usas fecha_inicio / fecha_fin

    protected $fillable = [
        'user_id',
        'house_id',
        'fianza',
        'fecha_inicio',
        'fecha_fin',
        'estado',      // opcional si lo usas aquí también
    ];

    public function casa()
    {
        return $this->belongsTo(Casa::class, 'house_id');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }
}
