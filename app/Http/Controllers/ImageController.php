<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

class ImageController extends Controller
{
    public function getImage($filename)
    {
        $filename = str_replace('/images/', '', $filename);
        $path = storage_path('app/public/storage/images/' . $filename);

        if (!Storage::disk('public')->exists('images/' . $filename)) {
            return response()->json(['error' => 'File not found.'], 404);
        }

        $file = Storage::disk('public')->get('images/' . $filename);
        $type = Storage::disk('public')->mimeType('images/' . $filename);

        return response($file, 200)->header('Content-Type', $type);
    }
}