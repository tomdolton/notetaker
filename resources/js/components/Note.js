import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Note = ({ activeNote, setActiveNote, getFolderNotes }) => {

  const [noteContent, setNoteContent] = useState("");
  const [noteIsShown, setNoteIsShown] = useState(false);



  useEffect(() => {
    setNoteContent(activeNote.content);
    setNoteIsShown(true);
  }, [activeNote]);



  const handleTextChange = (e) => {
    setNoteContent(e.target.value);
  }


  const handleNoteSave = () => {
    const note = {
      ...activeNote,
      content: noteContent
    };
    axios.put(`/api/notes/${note.id}`, note)
      .then(response => {
        getFolderNotes();
      });

  }


  const handleNoteDelete = () => {
    axios.delete(`api/notes/${activeNote.id}`)
      .then(response => {
        getFolderNotes();
        setNoteIsShown(false); //make component reload //
      })
      .catch(error => {
        console.log(error);
      });
  }




  return (

    <div>
      {noteIsShown &&
        <div className="card h-100 note-area">
          {/* <div className="card-header">Note name</div> */}
          <div className="card-body d-flex flex-column h-100">

            <div className="d-flex justify-content-between align-items-end mb-3">
              <h3 className="mb-0">{activeNote.name}</h3>
              <div className="btn-group" role="group" aria-label="Button group">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  title="Save note"
                  aria-label="Save"
                  onClick={handleNoteSave}
                >
                  <svg width="14" aria-hidden="true" className="svg-inline--fa fa-save fa-w-14 fa-2x" data-icon="save" data-prefix="fas" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 00316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 00-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 01320 111.48z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  title="Delete note"
                  aria-label="Delete"
                  onClick={handleNoteDelete}
                >
                  <svg width="14" aria-hidden="true" className="svg-inline--fa fa-trash fa-w-14 fa-2x" data-icon="trash" data-prefix="fas" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 00281.1 0H166.8a23.72 23.72 0 00-21.4 13.3L136 32H16A16 16 0 000 48v32a16 16 0 0016 16h416a16 16 0 0016-16V48a16 16 0 00-16-16zM53.2 467a48 48 0 0047.9 45h245.8a48 48 0 0047.9-45L416 128H32z" />
                  </svg>
                </button>
              </div>
            </div>


            <textarea
              className="form-control flex-grow-1§"
              value={noteContent}
              onChange={handleTextChange}
            >
            </textarea>
          </div>
        </div>
      }
    </div>
  );

}

export default Note;
