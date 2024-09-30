import React ,{useState} from "react";
// import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [credentials, setCredentials] = useState({email:"",password:""})
  let navigate = useNavigate();
  // const context = useContext(noteContext);
  // const {setToken } = context;
  const onChange =(e)=>{
    setCredentials({...credentials,[e.target.name] : e.target.value})
  }
  const handleOnsubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json  = await response.json();
    console.log(json)
    if(json.success){
      localStorage.setItem('token' , json.authtoken);
      props.showAlert("Logged in Successfully","success");
      navigate("/");
    }
    else{
      props.showAlert("Invalid Credentials","danger");
    }
  }

  return (
    <div className="container my-5">
      <form onSubmit={handleOnsubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}

          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
