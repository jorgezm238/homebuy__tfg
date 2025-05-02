<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('favoritos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('house_id');
            $table->timestamp('fecha_guardado')->useCurrent();

            $table->foreign('user_id')->references('id')->on('usuarios')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('house_id')->references('id')->on('casas')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('favoritos');
    }
};


?>