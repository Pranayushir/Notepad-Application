import React, { useContext,useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"",tag:""})

    const handleOnclick =(e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
      setNote({title:"",description:"",tag:""})
      props.showAlert("Added Successfully","success");
    }
  
    const onChange =(e)=>{
        setNote({...note,[e.target.name] : e.target.value})
    }
    
  return (
    <div className="container my-3">
      <h2>Make a Note</h2>
      <div className="container my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Enter title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={3}
              value={note.title}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Enter Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              value={note.description}

              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Enter tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <button disabled={note.title.length<3 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleOnclick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
