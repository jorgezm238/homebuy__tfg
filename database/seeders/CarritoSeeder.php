<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarritoSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('carritos')->insert([
            ['user_id' => 2],
        ]);
    }
}
?>