<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UsuarioSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('usuarios')->insert([
            [
                'nombre' => 'Admin User',
                'email' => 'admin@homebuy.com',
                'password' => Hash::make('admin123'),
                'tipo' => 'admin',
            ],
            [
                'nombre' => 'User Normal',
                'email' => 'user@homebuy.com',
                'password' => Hash::make('user123'),
                'tipo' => 'usuario',
            ],
        ]);
    }
}
?>