<?php

namespace App\Http\Controllers;

use App\Note;
use Illuminate\Http\Request;

class NoteController extends Controller {

  public function store(Request $request) {
    // Validate request data
    $validatedData = $request->validate([
      'name' => 'required',
      'folder_id' => 'required',
    ]);

    // Store this in the database
    $note = Note::create([
      'name' => $validatedData['name'],
      'folder_id' => $validatedData['folder_id'],
      'content' => ''
    ]);
    // Return the note as a JOSN response
    return $note->toJson();
  }


  public function update(Request $request, $id) {
    // Find the note with a matching ID
    $note = Note::find($id);
    // Change the ename to the new request name
    $note->content = $request->content;
    $note->save();
    // Return a JSON response
    return response()->json('Note updated.');
  }


  public function destroy($id) {
    // Find the note with a matching ID and delete
    $note = Note::find($id);
    $note->delete();
    // Return a JSON response
    return response()->json('Note deleted.');
  }
}
