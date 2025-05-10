<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorito extends Model
{
    public $timestamps = false;
    protected $table = 'favoritos';
    protected $fillable = ['user_id', 'house_id', 'fecha_guardado'];

    public function casa()
    {
        return $this->belongsTo(Casa::class, 'house_id');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }
}
