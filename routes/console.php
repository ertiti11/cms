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




// show all tables of db

Artisan::command('db:tables', function () {
    $tables = DB::select("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    foreach ($tables as $table) {
        $this->comment($table->table_name);
    }
})->purpose('Show all tables in the database')->hourly();


//show fields of table

Artisan::command('db:fields {table}', function ($table) {
    $fields = DB::select("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = ?", [$table]);
    foreach ($fields as $field) {
        $this->comment($field->column_name . ' - ' . $field->data_type);
    }
})->purpose('Show all fields of a table in the database')->hourly();

//show all records of table

Artisan::command('db:records {table}', function ($table) {
    $records = DB::table($table)->get();
    foreach ($records as $record) {
        $this->comment(json_encode($record));
    }
})->purpose('Show all records of a table in the database')->hourly();