<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GenericCollectionController extends Controller
{
    
    public function view(Request $request, string $collection)
    {
        //get all fields of the collection (table)
        $fields = DB::select("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = ?", [$collection]);
        
        //list all records on the table (collection)
        $records = DB::table($collection)->get();
        
        return response()->json($records);

    }
    
    public function create(Request $request, string $collection)
    {

        $fields = DB::select("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = ?", [$collection]);
        
        // quiero que el id se genere automaticamente
        
        //validate request fields

        try{
            $record = DB::table($collection)->insert($request->all());
            return response()->json($record);
        }
        catch(\Exception $e){
            return response()->json(["error" => $e->getMessage()]);
        }
    }
    
    public function update(Request $request)
    {
        //
    }
    
    public function delete(Request $request)
    {
        //
    }
    
    public function list(Request $request)
    {
        //
    }



}
