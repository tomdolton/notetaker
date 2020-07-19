import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FolderList = ({ activeFolder, setActiveFolder }) => {

  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState('');



  // Get folders from API
  useEffect(() => {
    getFolders();
  }, []);




  const getFolders = () => {
    axios.get('api/folders').then(response => {
      setFolders(response.data);
    })
  }


  const handleFolderClick = (e) => {
    const id = parseInt(e.target.value);
    setActiveFolder(id);
  }


  const handleFolderDelete = (e) => {
    const folder = e.target.closest("button");
    const id = parseInt(folder.value);

    axios.delete(`api/folders/${id}`)
      .then(getFolders());
  }


  const handleFieldChange = (e) => {
    setFolderName(e.target.value);
  }


  const handleCreateNewFolder = (e) => {
    e.preventDefault();

    const folder = { name: folderName };
    console.log(folder);

    axios.post('/api/folders', folder)
      .then(response => {
        setFolderName('');
        getFolders();
        console.log(response);
      });

  }




  return (
    <div className="card">
      <div className="card-body">
        <div className="h5 mb-3">Folders</div>

        <form onSubmit={handleCreateNewFolder} className="form-inline">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="folder"
              placeholder="New folder"
              value={folderName}
              onChange={handleFieldChange}
            />
            <label className="sr-only" htmlFor="folder">Email address</label>
            <div className="input-group-append">
              <button type="submit" className="btn btn-outline-secondary">Create</button>
            </div>
          </div>
        </form>

      </div>
      <ul className="list-group list-group-flush">
        {folders.map(folder =>
          <button
            className={`list-group-item list-group-item-action d-flex justify-content-between ${activeFolder == folder.id ? 'active' : ''}`}
            key={folder.id}
            value={folder.id}
            onClick={handleFolderClick}
          >
            <span>{folder.name}</span>
            <span onClick={handleFolderDelete}>
              <svg width="14" aria-hidden="true" className="svg-inline--fa fa-trash fa-w-14 fa-2x" data-icon="trash" data-prefix="fas" viewBox="0 0 448 512">
                <path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 00281.1 0H166.8a23.72 23.72 0 00-21.4 13.3L136 32H16A16 16 0 000 48v32a16 16 0 0016 16h416a16 16 0 0016-16V48a16 16 0 00-16-16zM53.2 467a48 48 0 0047.9 45h245.8a48 48 0 0047.9-45L416 128H32z" />
              </svg>
            </span>
          </button>
        )}
      </ul>
    </div>
  );
}

export default FolderList;
