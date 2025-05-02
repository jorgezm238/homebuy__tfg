<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UsuarioSeeder::class,
            CasaSeeder::class,
            CarritoSeeder::class,
            CarritoItemSeeder::class,
            ContactoSeeder::class,
            FavoritoSeeder::class,
            ReservaSeeder::class,
        ]);
    }
}
// This class is responsible for seeding the database with initial data.
?>

