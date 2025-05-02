<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContactoSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('contactos')->insert([
            [
                'user_id' => 2,
                'house_id' => 1,
                'mensaje' => 'Estoy interesado en esta casa, ¿podemos agendar una visita?',
                'fecha_contacto' => now(),
            ],
        ]);
    }
}
?>