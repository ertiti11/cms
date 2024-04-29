<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::resource('/user', UserController::Class);
Route::resource('/setting', SettingController::Class);
Route::resource('/post', PostController::Class);
Route::resource('/log', LogController::Class);
Route::resource('/comment', CommentController::Class);
Route::resource('/category', CategoryController::Class);

require __DIR__.'/auth.php';

