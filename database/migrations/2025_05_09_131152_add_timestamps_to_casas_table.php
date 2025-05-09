<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTimestampsToCasasTable extends Migration
{
    public function up()
    {
        Schema::table('casas', function (Blueprint $table) {
            $table->timestamps(); // añade created_at y updated_at al final
        });
    }

    public function down()
    {
        Schema::table('casas', function (Blueprint $table) {
            $table->dropTimestamps();
        });
    }
}
