<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('carritos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('usuarios')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->timestamp('creado_en')->useCurrent();
        });
    }

    public function down(): void {
        Schema::dropIfExists('carritos');
    }
};
