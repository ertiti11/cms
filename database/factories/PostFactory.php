<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => fake()->sentence(),
            'content' => fake()->paragraph(),
            'user_id' => fake()->numberBetween(1, 5),
            'category_id' => fake()->numberBetween(1, 5),
            'status' => fake()->randomElement(['draft', 'published', 'archived']),
        ];
    }
}
