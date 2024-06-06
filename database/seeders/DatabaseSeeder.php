<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        User::factory()->create([
            'name' => 'Diego',
            'email' => 'diego@example.com',
        ]);

        User::factory()->create([
            'name' => 'Julio',
            'email' => 'julio@example.com',
        ]);

        User::factory()->create([
            'name' => 'Paco',
            'email' => 'paco@example.com',
        ]);
    }
}
