<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SchemaController;
use App\Http\Controllers\GenericCollectionController;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('/create', [SchemaController::class, 'create']);



Route::get('/collections/{collection}/fields', [GenericCollectionController::class, 'showfields']);



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

//Obtener todas las tablas
Route::get('/collections/all', [SchemaController::class, 'view']);


Route::post('/register', [UserController::class, 'create']);

require __DIR__.'/auth.php';
