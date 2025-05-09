<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComprasTable extends Migration
{
    public function up()
    {
        // Solo crea la tabla si no existe
        if (! Schema::hasTable('compras')) {
            Schema::create('compras', function (Blueprint $table) {
                $table->id();

                // Ajusta el nombre de tu tabla de usuarios si no es 'users'
                $table->unsignedBigInteger('user_id');
                $table->foreign('user_id')
                      ->references('id')
                      ->on('usuarios')   // o 'users' si tu tabla de usuarios se llama así
                      ->onDelete('cascade');

                $table->unsignedBigInteger('house_id');
                $table->foreign('house_id')
                      ->references('id')
                      ->on('casas')
                      ->onDelete('cascade');

                $table->dateTime('fecha_compra')->nullable();
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('compras')) {
            Schema::dropIfExists('compras');
        }
    }
}
