<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarritoItemSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('carrito_items')->insert([
            ['carrito_id' => 1, 'casa_id' => 1, 'cantidad' => 1],
        ]);
    }
}
?>