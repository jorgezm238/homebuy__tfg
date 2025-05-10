<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCasaImagenesTable extends Migration
{
    public function up()
    {
        Schema::create('casa_imagenes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('casa_id')
                  ->constrained('casas')
                  ->onDelete('cascade');
            $table->string('ruta');           // ej. "houses/3/imagen1.jpg"
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('casa_imagenes');
    }
}
