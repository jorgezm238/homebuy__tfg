<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('carrito_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('carrito_id');
            $table->unsignedBigInteger('casa_id');
            $table->integer('cantidad')->default(1);

            $table->foreign('carrito_id')->references('id')->on('carritos')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('casa_id')->references('id')->on('casas')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('carrito_items');
    }
};


?>