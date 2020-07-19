<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// ---Folders--- //
// Read and show all folders
Route::get('folders', 'FolderController@index'); //
// Read and show one folder
Route::get('folders/{id}', 'FolderController@show'); //

// Create and store a folder and contents
Route::post('folders', 'FolderController@store');
// Edit and update a folder
Route::put('folders/{folder}', 'FolderController@update');
// Destroy a folder
Route::delete('folders/{folder}', 'FolderController@destroy');


// ---Notes--- //
// Create and store a note
Route::post('notes', 'NoteController@store'); //
// Edit and update a folder
Route::put('notes/{note}', 'NoteController@update'); // to do - edit title
// Destroy a note
Route::delete('notes/{note}', 'NoteController@destroy'); //
