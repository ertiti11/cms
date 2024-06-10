<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'content' => 'Category 1',
                'user_id' => 1,
                'post_id' => 1,
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'content' => 'Category 2',
                'user_id' => 2,
                'post_id' => 2,
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
        ]);
    }
}
