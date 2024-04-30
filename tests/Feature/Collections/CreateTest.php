<?php

use App\Http\Controllers\SchemaController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

uses(RefreshDatabase::class);

test('it creates a new table with the given schema', function () {
    $request = new Request([
        'collectionName' => 'Test Table',
        'collectionfields' => [
            'field1' => 'string',
            'field2' => 'integer',
        ],
    ]);

    $controller = new SchemaController();

    $response = $controller->create($request);

    expect($response->getData())->toHaveKey('success');
    expect($response->getData()->success)->toBe('Tabla creada con éxito');
    expect(Schema::hasTable('test_table'))->toBeTrue();

    Schema::dropIfExists('test_table');

});


test('it returns an error if the request is invalid', function () {
    $request = new Request([
        'collectionName' => 'Test Table',
    ]);

    $controller = new SchemaController();

    $response = $controller->create($request);

    expect($response->getData())->toHaveKey('error');
    expect($response->getData()->error)->toHaveKey('collectionfields');
    expect($response->getData()->error->collectionfields);
    expect(Schema::hasTable('test_table'))->toBeFalse();
});

test('it returns an error if the table already exists', function () {
    Schema::create('test_table', function ($table) {
        $table->id();
    });

    $request = new Request([
        'collectionName' => 'Test Table',
        'collectionfields' => [
            'field1' => 'string',
            'field2' => 'integer',
        ],
    ]);

    $controller = new SchemaController();

    $response = $controller->create($request);

    expect($response->getData())->toHaveKey('error');
    expect($response->getData()->error)->toBe('La tabla ya existe');
    expect(Schema::hasTable('test_table'))->toBeTrue();

    Schema::dropIfExists('test_table');
});

test('it converts the table name and field names to lowercase and replaces spaces with underscores', function () {
    $request = new Request([
        'collectionName' => 'Test Table',
        'collectionfields' => [
            'Field One' => 'string',
            'Field Two' => 'integer',
        ],
    ]);

    $controller = new SchemaController();

    $response = $controller->create($request);

    expect($response->getData())->toHaveKey('success');
    expect($response->getData()->success)->toBe('Tabla creada con éxito');
    expect(Schema::hasTable('test_table'))->toBeTrue();

    $fields = Schema::getColumnListing('test_table');
    expect($fields)->toContain('field_one');
    expect($fields)->toContain('field_two');

    Schema::dropIfExists('test_table');
});

test('it returns an error if the table name is missing', function () {
    $request = new Request([
        'collectionfields' => [
            'field1' => 'string',
            'field2' => 'integer',
        ],
    ]);

    $controller = new SchemaController();

    $response = $controller->create($request);

    expect($response->getData())->toHaveKey('error');
    expect($response->getData()->error)->toHaveKey('collectionName');
    expect($response->getData()->error->collectionName);
    expect(Schema::hasTable('test_table'))->toBeFalse();
});


test('it returns an error if the field names are missing', function () {
    $request = new Request([
        'collectionName' => 'Test Table',
    ]);

    $controller = new SchemaController();

    $response = $controller->create($request);

    expect($response->getData())->toHaveKey('error');
    expect($response->getData()->error)->toHaveKey('collectionfields');
    expect($response->getData()->error->collectionfields);
    expect(Schema::hasTable('test_table'))->toBeFalse();
});

test('it returns an error if the field names are not an array', function () {
    $request = new Request([
        'collectionName' => 'Test Table',
        'collectionfields' => 'field1',
    ]);

    $controller = new SchemaController();

    $response = $controller->create($request);

    expect($response->getData())->toHaveKey('error');
    expect($response->getData()->error)->toHaveKey('collectionfields');
    expect($response->getData()->error->collectionfields);
    expect(Schema::hasTable('test_table'))->toBeFalse();
});