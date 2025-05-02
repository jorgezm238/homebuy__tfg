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
        Schema::create('product', function (Blueprint $table) {
            $table->id('id_product');
            $table->string('name', 64);
            $table->string('description', 128);

            $table->unsignedBigInteger('id_category');
            $table->foreign('id_category')->references('id_category')->on('category');

            $table->float('price');
            $table->boolean('is_enabled');
            $table->integer('count');
            $table->integer('count_minimum');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_imagen');
        Schema::dropIfExists('product');
    }
};
