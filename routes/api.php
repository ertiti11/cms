<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SchemaController;
use App\Http\Controllers\GenericCollectionController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('/create', [SchemaController::class, 'create']);


//generic crud for all schemas

//list/search
Route::get('/collections/{collection}/records', [GenericCollectionController::class, 'view']);
//view
Route::get('/collections/{collection}/records/{id}', [GenericCollectionController::class, 'read']);
//create
Route::post('/collections/{collection}/records', [GenericCollectionController::class, 'create']);
//update
Route::patch('/collections/{collection}/records/{id}', [GenericCollectionController::class, 'delete']);
//delete
Route::post('/collections/{collection}/records/{id}', [GenericCollectionController::class, 'list']);

//list/search
Route::get('/collections/users/records', [RegisteredUserController::class, 'view']);
//view
Route::get('/collections/users/records/{id}', [RegisteredUserController::class, 'read']);
//create
Route::post('/collections/users/records', [RegisteredUserController::class, 'create']);
//update
Route::patch('/collections/users/records/{id}', [RegisteredUserController::class, 'delete']);
//delete
Route::post('/collections/users/records/{id}', [RegisteredUserController::class, 'list']);