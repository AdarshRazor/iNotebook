import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteslist = [];

  const [notes, setnotes] = useState(noteslist);

  const getNotes = async () => {
    // API call
    try {
      // console.log('Token:', token); // Log the token value

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      // console.log('Fetched notes:', json);

      if (Array.isArray(json)) {
        setnotes(json);
      } else {
        console.error('Expected an array of notes, but got:', json);
        setnotes([]); // Set to an empty array if response is not an array
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      setnotes([]); // Handle error by setting an empty array
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}),
      });
  
      const note = await response.json(); // Assuming server returns the newly added note
      setnotes(notes.concat(note)); // Update notes state with the new note
  };
  


  // Delete a note
  const deleteNote = async (id) => {
    // API call to delete a note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
    });
    const json = response.json();
    console.log(json)

    // Filter the notes array to keep only the ones that don't match the given id
    // console.log("Deleteing note with id" +  id)
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };



  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // Fetch API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setnotes(newNotes)
  };



  return (
    <noteContext.Provider
      value={{ notes, setnotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
