<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('blogs')->insert([
            'title' => 'My first blog post',
            'content' => 'This is my first blog post content',
            'thumbnail' => 'https://via.placeholder.com/150',
            'user_id' => 1,
            'category_id' => 1,
            'status' => 'published',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('blogs')->insert([
            'title' => 'My second blog post',
            'content' => 'This is my second blog post content',
            'thumbnail' => 'https://via.placeholder.com/150',
            'user_id' => 1,
            'category_id' => 1,
            'status' => 'published',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('blogs')->insert([
            'title' => 'My third blog post',
            'content' => 'This is my third blog post content',
            'thumbnail' => 'https://via.placeholder.com/150',
            'user_id' => 1,
            'category_id' => 1,
            'status' => 'published',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
