import React from "react";
// import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";




const Home = (props) => {
  return (
    <>
        <div className="container">
        <Notes showAlert={props.showAlert}/>
        </div>
      
    </>
  );
};

export default Home;
