<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

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

