<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('casas', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->text('descripcion');
            $table->decimal('precio', 10, 2);
            $table->string('direccion');
            $table->enum('estado', ['disponible', 'reservada', 'vendida']);
            $table->string('imagen')->nullable();
            $table->unsignedBigInteger('agente_id');

            $table->foreign('agente_id')->references('id')->on('usuarios')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('casas');
    }
};



?>