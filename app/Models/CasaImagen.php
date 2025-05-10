<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CasaImagen extends Model
{
    protected $table = 'casa_imagenes';
    protected $fillable = ['casa_id', 'ruta'];

    public function casa()
    {
        return $this->belongsTo(Casa::class, 'casa_id');
    }
}
