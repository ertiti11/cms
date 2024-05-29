<?php

namespace App\Http\Controllers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class SchemaController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->all();


        // Mapa de funciones de manejo de tipos de datos
        $dataHandlers = [
            'string' => function ($value) {
                $url = "STRING";
                return $url;
            },
            'file' => function ($value) {
                $url = "string";
                return $url;
            },
            // Agrega más manejadores para otros tipos de datos según sea necesario
        ];



        //el campo collectionfields

        $validator = Validator::make($data, [
            'collectionName' => 'required|string',
            'collectionfields' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        //convertir todos las mayusculas a minusculas y los espacios por _

        $data['collectionName'] = strtolower(str_replace(' ', '_', $data['collectionName']));

        $newCollectionFields = [];
        foreach ($data['collectionfields'] as $field => $type) {
            $newField = strtolower(str_replace(' ', '_', $field));
            $newCollectionFields[$newField] = $type;
        }
        $data['collectionfields'] = $newCollectionFields;


        // Validar que los datos necesarios están presentes
        if (!isset($data['collectionName']) || !isset($data['collectionfields']) || !is_array($data['collectionfields'])) {
            return response()->json(['error' => 'Datos inválidos'], 400);
        }

        $tableName = $data['collectionName'];
        $fields = $data['collectionfields'];



        //controlar si la tabla ya existe, si es asi devolver un error
        if (Schema::hasTable($tableName)) {
            return response()->json(['error' => 'La tabla ya existe'], 400);
        }

        //saca el valor de fields y no el key
        $types = array_values($fields);

        //ejecutar una funcion de dataHandlers para cada tipo de dato

        foreach ($types as $type) {
            if (isset($dataHandlers[$type])) {
                $dataHandlers[$type]($type);
            }
        }

        // Crear la tabla
        
        Schema::create($tableName, function (Blueprint $table) use ($fields) {
            $table->increments('id');
            foreach ($fields as $fieldName => $fieldType) {
                if ($fieldType == 'file') {
                    $table->string($fieldName . '_file');                    continue;
                }
                $table->$fieldType($fieldName);
            }
        });

        return response()->json(['success' => 'Tabla creada con éxito'], 200);
    }

    public function view(Request $request)
    {
        //get all table names of the db
        $tables = DB::select("SELECT table_name FROM information_schema.tables WHERE table_schema = 'cms2'");
        
        //transform the result into an array of table names
        $tableNames = array_map('current',$tables);
        
        return response()->json($tableNames);
    }
    public function read( $id)
    {
        // get all tables with user_id = $id
        $tables = DB::select("SELECT table_name FROM information_schema.tables WHERE table_schema = 'cms2' AND table_name LIKE 'user_%' AND table_name LIKE '%$id%'");
    }
}
