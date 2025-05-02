<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartProduct extends Model
{
    use HasFactory;

    protected $table = 'cart_product';
    protected $primaryKey = 'id_cart_product';

    public function product() : BelongsTo
    {
        return $this->belongsTo(Product::class, 'id_product')
            ->with('category')
            ->with('productImagen');
    }
}
