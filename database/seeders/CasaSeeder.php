<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CasaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('casas')->insert([
            [
                'titulo' => 'Casa moderna en el centro',
                'descripcion' => 'Bonita casa de 3 habitaciones con jardín',
                'precio' => 220000.00,
                'direccion' => 'Calle Mayor 10, Madrid',
                'estado' => 'disponible',
                'imagen' => 'casa1.jpg',
                'agente_id' => 1,
            ],
        ]);
    }
}
?>