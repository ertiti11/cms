<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


Artisan::command('db:clear', function () {
    $this->comment('Dropping all tables');
    $tables = DB::select("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    foreach ($tables as $table) {
        $table_name = $table->table_name;
        DB::statement('DROP TABLE IF EXISTS ' . $table_name . ' CASCADE');
    }
    $this->comment('All tables dropped');
})->purpose('Drop all tables in the database')->hourly();


