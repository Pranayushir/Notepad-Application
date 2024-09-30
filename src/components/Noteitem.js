import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const {note ,updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title mx-2  ">{note.title}</h5>
            <div>
              <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note)}}></i>
              <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success");}}></i>
            </div>
          </div>
          <div className="mx-2">
            <p className="card-text">{note.description}</p>
            <span className="badge text-bg-dark">{note.tag}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
