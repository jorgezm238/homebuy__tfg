<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('carrito_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('carrito_id')
                  ->constrained('carritos')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->foreignId('casa_id')
                  ->constrained('casas')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->integer('cantidad')->default(1);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('carrito_items');
    }
};
