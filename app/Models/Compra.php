<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'compras'; 

    protected $fillable = [
        'user_id',
        'house_id',
        'fecha_compra', 
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
