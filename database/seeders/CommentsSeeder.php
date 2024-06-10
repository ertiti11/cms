<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('comments')->insert([
            [
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'user_id' => 1,
                'post_id' => 1,
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'content' => 'Nulla facilisi. Sed euismod, nunc id aliquam tincidunt, elit nunc tincidunt nunc, auctor tincidunt nunc risus id nunc.',
                'user_id' => 2,
                'post_id' => 1,
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
        ]);
    }
}
