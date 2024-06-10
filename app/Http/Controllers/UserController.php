<?php
namespace App\Http\Controllers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class UserController extends Controller 
{
    // crea el crud basico para el controlador
    public function view()
    {
        $data = DB::table('users')->get();
        return response()->json($data);
    }

    public function read($id)
    {
        $data = DB::table('users')->where('id', $id)->first();
        return response()->json($data);
    }

    public function create(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'data' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $id = DB::table('users')->insertGetId($data['data']);
        return response()->json(['id' => $id]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'data' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        DB::table('users')->where('id', $id)->update($data['data']);
        return response()->json(['id' => $id]);
    }

    public function delete($id)
    {
        DB::table('users')->where('id', $id)->delete();
        return response()->json(['id' => $id]);
    }  

    public function showfields()
    {
        $fields = Schema::getColumnListing('users');
        return response()->json($fields);
    }

    public function list($id)
    {
        $data = DB::table('users')->where('id', $id)->get();
        return response()->json($data);
    }


}