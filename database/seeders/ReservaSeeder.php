<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReservaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('reservas')->insert([
            [
                'user_id' => 2,
                'house_id' => 1,
                'fianza' => 5000.00,
                'fecha_inicio' => now(),
                'fecha_fin' => now()->addDays(30),
            ],
        ]);
    }
}
?>