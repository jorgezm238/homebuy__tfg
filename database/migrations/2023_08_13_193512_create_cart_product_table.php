<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cart_product', function (Blueprint $table) {
            $table->id('id_cart_product');

            $table->unsignedBigInteger('id_product');
            $table->foreign('id_product')->references('id_product')->on('product');

            $table->integer('count_product');
            $table->float('price_product');

            $table->unsignedBigInteger('id_cart');
            $table->foreign('id_cart')->references('id_cart')->on('cart');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_product');
    }
};
