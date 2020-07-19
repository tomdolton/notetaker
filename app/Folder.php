<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model {

  protected $guarded = [];

  public function notes() {
    return $this->hasMany(Note::class);
  }
}
