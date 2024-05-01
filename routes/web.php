<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return ['CMS' => "0.0.1"];
});



require __DIR__.'/auth.php';

