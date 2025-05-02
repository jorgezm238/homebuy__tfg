<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FavoritoSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('favoritos')->insert([
            ['user_id' => 2, 'house_id' => 1],
        ]);
    }
}
?>