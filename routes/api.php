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

Route::get('users', function () {
    return response()->json([
        'users' => \App\Models\User::all()
    ]);
});


//generic crud for all schemas
//list/search
Route::get('/collections/{collection}/records', [GenericCollectionController::class, 'view']);
//view
Route::get('/collections/{collection}/records/{id}', [GenericCollectionController::class, 'read']);
//create
Route::post('/collections/{collection}/records', [GenericCollectionController::class, 'create']);
//update
Route::patch('/collections/{collection}/records/{id}', [GenericCollectionController::class, 'update']);
//delete
Route::delete('/collections/{collection}/records/{id}', [GenericCollectionController::class, 'delete']);


//Obtener todas las tablas
Route::get('/collections/all', [SchemaController::class, 'view']);
Route::get('/collections/{id}', [SchemaController::class, 'read']);
require __DIR__.'/auth.php';
