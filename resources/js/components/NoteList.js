import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

const NoteList = ({ activeFolder, notes, activeNote, setActiveNote, getFolderNotes }) => {

  const [noteName, setNoteName] = useState('');




  // Sets note as active when it is clicked
  const handleNoteClick = (e) => {

    const button = e.target.closest('button');
    const id = parseInt(button.value);

    setActiveNote(notes.filter(note => {
      return note.id === id;
    })[0]);
  }


  const handleFieldChange = (e) => {
    setNoteName(e.target.value);
  }


  const handleCreateNewNote = (e) => {
    e.preventDefault();

    const note = {
      name: noteName,
      folder_id: activeFolder
    };

    console.log(note);

    axios.post('/api/notes', note)
      .then(response => {
        setNoteName('');
        getFolderNotes();
      }).catch(error => {
        console.log(error);
      });
  }




  return (
    <div className="card">
      <div className="card-body">
        <div className="h5 mb-3">Notes</div>

        <form onSubmit={handleCreateNewNote} className="form-inline">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="folder"
              placeholder="New note"
              value={noteName}
              onChange={handleFieldChange}
            />
            <label className="sr-only" htmlFor="folder">New note</label>
            <div className="input-group-append">
              <button
                type="submit"
                className="btn btn-outline-secondary"
              >
                Create
              </button>
            </div>
          </div>
        </form>

      </div>
      <ul className="list-group list-group-flush">
        {notes.map(note =>

          <button
            className={`list-group-item list-group-item-action ${note.id === activeNote.id && 'active'}`}
            key={note.id}
            value={note.id}
            onClick={handleNoteClick}
            style={{ maxHeight: "90px" }}
          >
            <h6 className="font-weight-bolder">{note.name}</h6>
            <p className={`small ${note.id === activeNote.id ? 'text-light' : 'text-muted'}`}>
              {_.truncate(note.content, { length: 105 })}
            </p>
          </button>

        )}
      </ul>
    </div>
  );
}

export default NoteList;
