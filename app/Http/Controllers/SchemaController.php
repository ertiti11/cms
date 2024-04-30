<?php

namespace App\Http\Controllers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class SchemaController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->all();

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
        // Crear la tabla
        Schema::create($tableName, function (Blueprint $table) use ($fields) {
            $table->increments('id');

            foreach ($fields as $fieldName => $fieldType) {
                $table->$fieldType($fieldName);
            }
        });

        return response()->json(['success' => 'Tabla creada con éxito'], 200);
    }
}
