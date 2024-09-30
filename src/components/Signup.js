import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  let navigate = useNavigate();
  const onChange =(e)=>{
    setCredentials({...credentials,[e.target.name] : e.target.value})
  }
  const handleOnsubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
    });
    const json  = await response.json();
    console.log(json)
    if(json.success){
      localStorage.setItem('token' , json.authToken);
      props.showAlert("Created User Successfully","success");
      navigate("/login");
    }
    else{
      props.showAlert("Invalid Credentials ","danger");
    }
  }
  return (
    <div className="container my-5">
      <form onSubmit={handleOnsubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
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
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            className="form-control"
            value={credentials.cpassword}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup