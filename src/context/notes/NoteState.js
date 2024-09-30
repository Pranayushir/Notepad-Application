import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);
    const [token, setToken] = useState(null)

    // fetching all notes
    const getNotes = async ()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5MGViMWFjZTAzZDljYzQ0OGQxMGQ3In0sImlhdCI6MTcyMTAyMzg5OH0._ZglV-0s1TEHKglBsfjv21hri2QAPLsWhIqqOnSV5mQ"
          "auth-token":localStorage.getItem('token')
        },
      });
      const json  = await response.json();
      // console.log(json);
      setNotes(json);
    }

    // add a note
      const addNote = async (title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5MGViMWFjZTAzZDljYzQ0OGQxMGQ3In0sImlhdCI6MTcyMTAyMzg5OH0._ZglV-0s1TEHKglBsfjv21hri2QAPLsWhIqqOnSV5mQ"
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})
        });
        const note  =  await response.json();
        setNotes(notes.concat(note))
      }

      //   edit a note
      const editNote = async (id,title,description,tag)=>{
        //api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4MTJmZDkyNTYzZGRjMzYzZTJkZDg4In0sImlhdCI6MTcyMDc3MTY5NH0.xJnaWYsIvomVFujS0_57ogRPI0SGSND7i8ui43CZx_c"
         "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})
        });
        const json  = await response.json();
        console.log(json)
        //logic for edit in client
        
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        } 
        setNotes(newNotes);
      }
      //   delete a note
      const deleteNote = async(id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4MTJmZDkyNTYzZGRjMzYzZTJkZDg4In0sImlhdCI6MTcyMDc3MTY5NH0.xJnaWYsIvomVFujS0_57ogRPI0SGSND7i8ui43CZx_c"
            "auth-token":localStorage.getItem('token')
          },
        });
        const json  = await response.json();
        console.log(json)
       
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setNotes(newNotes);
      }
    return(
       <NoteContext.Provider value = {{notes,addNote,deleteNote,getNotes,editNote,token,setToken}}>
            {props.children}
       </NoteContext.Provider>
    )
}

export default NoteState;
