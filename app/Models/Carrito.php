<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    public $timestamps = false;
    protected $table = 'carritos';
    protected $fillable = ['user_id', 'creado_en'];

    public function items()
    {
        return $this->hasMany(CarritoItem::class, 'carrito_id');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }
}
