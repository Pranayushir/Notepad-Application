import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const About = () => {
  const a = useContext(noteContext);
  return (
    <div>
      hello, i am {a.name}!!
    </div>
  )
}

export default About