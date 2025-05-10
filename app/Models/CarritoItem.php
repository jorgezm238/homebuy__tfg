<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarritoItem extends Model
{
    protected $fillable = ['carrito_id','casa_id','cantidad'];
    public function casa()
    {
        return $this->belongsTo(Casa::class,'casa_id');
    }
    public function carrito()
    {
        return $this->belongsTo(Carrito::class,'carrito_id');
    }
}

