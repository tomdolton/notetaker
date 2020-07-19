import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import FolderList from './FolderList';
import NoteList from './NoteList';
import Note from './Note';

function App() {

  const [activeFolder, setActiveFolder] = useState();
  const [activeNote, setActiveNote] = useState([]);
  const [notes, setNotes] = useState([]);




  // Get notes in selected folder from API when active folder is changed
  useEffect(() => {
    if (activeFolder) {
      getFolderNotes();
    }
  }, [activeFolder, activeNote]);




  const getFolderNotes = () => {
    axios.get(`api/folders/${activeFolder}`).then(response => {
      setNotes(response.data.notes);
    })
  }




  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-md-2">
            <FolderList
              activeFolder={activeFolder}
              setActiveFolder={setActiveFolder}
            />
          </div>
          <div className="col-md-3">
            <NoteList
              activeFolder={activeFolder}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
              notes={notes}
              getFolderNotes={getFolderNotes}
            />
          </div>
          <div className="col-md-7">
            <Note
              activeFolder={activeFolder}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
              getFolderNotes={getFolderNotes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


ReactDOM.render(<App />, document.getElementById('app'));

