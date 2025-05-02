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
        Schema::create('product_imagen', function (Blueprint $table) {
            $table->id('id_product_imagen');
            $table->text('url_imagen');

            $table->unsignedBigInteger('id_product');
            $table->foreign('id_product')->references('id_product')->on('product');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_imagen');
    }
};
