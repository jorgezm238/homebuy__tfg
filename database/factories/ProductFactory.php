<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'description' => fake()->sentence(),
            'id_category' => fake()->numberBetween(1, 5),
            'price' => fake()->randomFloat(2, 0, 100),
            'is_enabled' => true,
            'count' => fake()->numberBetween(1, 20),
            'count_minimum' => 1
        ];
    }
}
