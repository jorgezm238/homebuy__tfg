<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $table = 'product';
    protected $primaryKey = 'id_product';

    public function productImagen() : HasMany
    {
        return $this->hasMany(ProductImagen::class, 'id_product');
    }

    public function category() : BelongsTo
    {
        return $this->belongsTo(Category::class, 'id_category');
    }
}
