<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImagen extends Model
{
    use HasFactory;

    protected $table = 'product_imagen';
    protected $primaryKey = 'id_product_imagen';
}
