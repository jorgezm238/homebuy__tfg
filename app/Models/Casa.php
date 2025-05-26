<?php
// app/Models/Casa.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Casa extends Model
{
    use HasFactory;

    protected $table = 'casas';

    protected $fillable = [
        'titulo',
        'descripcion',
        'precio',
        'direccion',
        'estado',
        'imagen',
        'agente_id',
    ];

    public function images()
    {
        return $this->hasMany(CasaImagen::class, 'casa_id');
    }

    //relación con reservas (usa house_id)
    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'house_id');
    }

    //relación con compras (usa house_id)
    public function compras()
    {
        return $this->hasMany(Compra::class, 'house_id');
    }
}
