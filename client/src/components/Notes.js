import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/noteContext";
import { Modal } from "react-bootstrap";
import {useNavigate }  from "react-router-dom";

function Notes(props) {
  let history = useNavigate()
  // Get context from noteContext
  const context = useContext(noteContext);
  // destructure context
  const { notes, deleteNote, getNotes, editNote } = context;

  const [note, setnote] = useState({id: "", etitle: "", edescription: "", etag: ""})

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      props.showAlert("Please Login or Signup if you are a new user", "warning")
      history("/login")
    }
    
    // eslint-disable-next-line
  }, []);

  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility

  const updateNote = (currentnote) => {
    setnote({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag})
    setShowModal(currentnote); // Show modal when updating note
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteNote(id);
    props.showAlert("Todo deleted", "danger")
  };

  const handleSaveChanges = (e) => {
    // Implement logic to save changes to the note
    editNote(note.id, note.etitle, note.edescription, note.etag)
    setShowModal(false);
    props.showAlert("Todo updated", "warning")
  };

  const onChange = (e) => {
    setnote({...note, [e.target.name]: e.target.value});
  }

  return (
    <>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-3 my-2">
          {notes.length === 0 && 'No notes available'}
        </div>
        {notes.map((note) => (
          <div key={note._id} className="col-md-3">
            <div className="card my-3">
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: "bold" }}>
                  {note.title}
                </h5>
                <p className="card-text">{note.description}</p>
                <i
                  className="fa-solid fa-trash-can m-2"
                  onClick={() => {
                    handleDelete(note._id);
                  }}
                ></i>
                <i
                  className="fa-regular fa-pen-to-square m-2"
                  onClick={() => {
                    updateNote(note);
                  }}
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add form or content for editing the note */}
          <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              value={note.etitle}
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              value={note.edescription}
              name="edescription"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              value={note.etag}
              name="etag"
              onChange={onChange}
            />
          </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleSaveChanges}>
            Update Note
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Notes;
