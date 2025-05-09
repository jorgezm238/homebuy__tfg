<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeFechaFinNullableOnReservasTable extends Migration
{
    public function up()
    {
        Schema::table('reservas', function (Blueprint $table) {
            $table->dateTime('fecha_fin')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('reservas', function (Blueprint $table) {
            $table->dateTime('fecha_fin')->nullable(false)->change();
        });
    }
}
