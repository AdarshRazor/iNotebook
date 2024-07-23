import React, { useContext, useState } from "react";
import Notes from "./Notes";
import noteContext from "../context/noteContext";

function Home(props) {

  const {showAlert} = props
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setnote] = useState({title: "", description: "", tag: ""})

  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    props.showAlert("Todo Added", "success")
    setnote({title: "", description: "", tag: ""})
  };

  const onChange = (e) => {
    setnote({...note, [e.target.name]: e.target.value});
  }

  return (
    <div className="container">
      <div className="my-5">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
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
              id="description"
              value={note.description}
              name="description"
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
              id="tag"
              value={note.tag}
              name="tag"
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleclick}
          >
            Add Note
          </button>
        </form>
      </div>

      <Notes showAlert={showAlert}/>
    </div>
  );
}

export default Home;
