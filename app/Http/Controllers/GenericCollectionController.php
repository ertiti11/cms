<?php
namespace App\Http\Controllers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class GenericCollectionController extends Controller 
{
    // crea el crud basico para el controlador
    public function view($collection)
    {
        $data = DB::table($collection)->get();
        return response()->json($data);
    }

    public function read($collection, $id)
    {
        $data = DB::table($collection)->where('id', $id)->first();
        return response()->json($data);
    }

    public function create(Request $request, $collection)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'data' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $id = DB::table($collection)->insertGetId($data['data']);
        return response()->json(['id' => $id]);
    }

    public function update(Request $request, $collection, $id)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'data' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        DB::table($collection)->where('id', $id)->update($data['data']);
        return response()->json(['id' => $id]);
    }

    public function delete($collection, $id)
    {
        DB::table($collection)->where('id', $id)->delete();
        return response()->json(['id' => $id]);
    }  

    public function showfields($collection)
    {
        $fields = Schema::getColumnListing($collection);
        return response()->json($fields);
    }

    public function list($collection, $id)
    {
        $data = DB::table($collection)->where('id', $id)->get();
        return response()->json($data);
    }

    
}