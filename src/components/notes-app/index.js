import React, { useState } from "react";
import "./index.css";

function NotesApp() {
  const [noteName, setNoteName] = useState();
  const [noteStatus, setNoteStatus] = useState();
  const [notes, setNotes] = useState([]);
  const [filter, setFilterBy] = useState('all');
  // let renderNotes = notes;

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

  /**
   * Get all notes in following order
   * - active
   * - completed
   * - others
   */
  const getAllNotes = () => {
    const allNotes = [].concat(notes.filter(n => n.status === 'active'), notes.filter(n => n.status === 'completed'), notes.filter(n => n.status !== 'active' || n.status !== 'completed'));
    return allNotes;
  }

  /**
   * When filter value changes, re-calculate notes variable req for render.
   * Keep the render function dumb. Make changes in data only.
   * @param {string} filter New filter value
   */
  const handleFilterChange = (filter) => {
    // if (filter === 'all') {
    //   renderNotes = getAllNotes();
    // } else if (filter === 'active') {
    //   renderNotes = notes.filter(n => n.status === 'active');
    // } else if (filter === 'completed') {
    //   renderNotes = notes.filter(n => n.status === 'completed');
    // }
    setFilterBy(filter);
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
            {notes.map((note, idx) => (
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