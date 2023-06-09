import logo from "./logo.svg";

import React, { useState } from "react";
import "./App.css";
function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [currentEdit, setCurrentEdit] = useState(null);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== "" || note.trim() !== "") {
      const newNote = {
        title: title.trim(),
        text: note.trim(),
        created_at: new Date(),
      };
      if (currentEdit !== null) {
        const updatedNotes = notes.map((item, index) =>
          index === currentEdit ? newNote : item
        );
        setNotes(updatedNotes);
        setCurrentEdit(null);
      } else {
        setNotes([...notes, newNote]);
      }
      setTitle("");
      setNote("");
    }
  };
  const handleEdit = (index) => {
    setCurrentEdit(index);
    setTitle(notes[index].title);
    setNote(notes[index].text);
  };
  const handleDelete = (index) => {
    const updatedNotes = notes.filter((note, idx) => idx !== index);
    setNotes(updatedNotes);
  };
  return (
    <div className="App">
      {" "}
      <h1>Add a Note</h1>{" "}
      <form onSubmit={handleSubmit}>
        {" "}
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={handleTitleChange}
        />{" "}
        <textarea
          rows="4"
          placeholder="Enter a note..."
          value={note}
          onChange={handleNoteChange}
        ></textarea>{" "}
        <button type="submit">
          {" "}
          {currentEdit !== null ? "Save changes" : "Save note"}{" "}
        </button>{" "}
      </form>{" "}
      <h2>Your Notes</h2>{" "}
      <ul>
        {" "}
        {notes.map((note, index) => (
          <li key={index}>
            {" "}
            <div className="note-title">{note.title}</div>{" "}
            <div className="note-text">{note.text}</div>{" "}
            <div className="note-info">
              {" "}
              <span className="note-date">
                {note.created_at.toLocaleString()}
              </span>{" "}
              <button className="note-edit" onClick={() => handleEdit(index)}>
                {" "}
                Edit{" "}
              </button>{" "}
              <button
                className="note-delete"
                onClick={() => handleDelete(index)}
              >
                {" "}
                Delete{" "}
              </button>{" "}
            </div>{" "}
          </li>
        ))}{" "}
      </ul>{" "}
    </div>
  );
}

export default App;
