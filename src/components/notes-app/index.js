import React, { useEffect, useState } from "react";
import "./index.css";

function NotesApp() {
  const [noteName, setNoteName] = useState();
  const [noteStatus, setNoteStatus] = useState();
  const [notes, setNotes] = useState([]);
  const [filterBy, setFilterBy] = useState('all');
  const [renderNotes, setRenderNotes] = useState([]);

  const handleAddNote = () => {
    setNotes((previousNotes) => [
      ...previousNotes,
      {
        name: noteName,
        status: noteStatus
      }
    ]);
    setNoteName('');
    setNoteStatus('');
  }

  useEffect(() => {
    setRenderNotes(getRenderNotes(notes, filterBy));
  }, [notes, filterBy]);

  const getActiveNotes = (notes) => {
    return notes.filter(n => n.status === 'active')
  }

  const getCompletedNotes = (notes) => {
    return notes.filter(n => n.status === 'completed')
  }

  const getOtherNotes = (notes) => {
    return notes.filter(n => !(n.status === 'active' || n.status === 'completed'))
  }

  const getAllNotes = (notes) => {
    return [].concat(getActiveNotes(notes), getCompletedNotes(notes), getOtherNotes(notes));
  }

  const getRenderNotes = (notes, filterBy) => {
    if (filterBy === 'all') {
      return getAllNotes(notes);
    } else if (filterBy === 'active') {
      return getActiveNotes(notes);
    } else if (filterBy === 'completed') {
      return getCompletedNotes(notes);
    }
  }

  const handleFilterChange = (filterBy) => {
    setFilterBy(filterBy);
  }

  return (
    <div className="layout-column align-items-center justify-content-start">
      <section className="layout-row align-items-center justify-content-center mt-30">
        <input data-testid="input-note-name" type="text" className="large mx-8"
          placeholder="Note Title" onChange={e => setNoteName(e.target.value)} value={noteName} />
        <input data-testid="input-note-status" type="text" className="large mx-8"
          placeholder="Note Status" onChange={e => setNoteStatus(e.target.value.toLowerCase())} value={noteStatus} />
        <button className="" data-testid="submit-button" onClick={handleAddNote}>Add Note</button>
      </section>

      <div className="mt-50">
        <ul className="tabs">
          <li className="tab-item slide-up-fade-in" data-testid="allButton" onClick={e => handleFilterChange('all')}>All</li>
          <li className="tab-item slide-up-fade-in" data-testid="activeButton" onClick={e => handleFilterChange('active')}>Active</li>
          <li className="tab-item slide-up-fade-in" data-testid="completedButton" onClick={e => handleFilterChange('completed')}>Completed</li>
        </ul>
      </div>
      <div className="card w-40 pt-30 pb-8">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody data-testid="noteList">
            {renderNotes.map((note, idx) => (
              <tr key={idx}>
                <td>{note.name}</td>
                <td>{note.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NotesApp