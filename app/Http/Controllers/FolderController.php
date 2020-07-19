<?php

namespace App\Http\Controllers;

use App\Folder;
use Illuminate\Http\Request;

class FolderController extends Controller {

  public function index() {
    // Get all data from fodler table
    $folders = Folder::all();
    // Convert this to JSON and return it
    return $folders->toJson();
  }


  public function store(Request $request) {
    // Validate request data
    $validatedData = $request->validate([
      'name' => 'required',
    ]);
    // Store this in the database
    $folder = Folder::create([
      'name' => $validatedData['name'],
    ]);
    // Return a JSON response
    return response()->json('Folder created.');
  }


  public function show($id) {
    // Find the folder with this ID and the assiciated notes
    $folder = Folder::with('notes')->find($id);
    // Convert this to JSON and return it
    return $folder->toJson();
  }


  public function update(Request $request, $id) {
    // Find the folder with a matching ID
    $folder = Folder::find($id);
    // Change the ename to the new request name
    $folder->name = $request->name;
    $folder->save();
    // Return a JSON response
    return response()->json('Folder updated.');
  }


  public function destroy($id) {
    // Find the folder with a matching ID
    $folder = Folder::find($id);
    $folder->delete();
    // Return a JSON response
    return response()->json('Folder deleted.');
  }
}
