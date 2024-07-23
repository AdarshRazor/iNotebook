import React, { useState } from "react";
import {useNavigate }  from "react-router-dom";

function Login(props) {

    const [credentials, setcredentials] = useState({email: "", password: ""})
    let history = useNavigate()

    const handSubmit = async (e) => {
        e.preventDefault();
        // TODO: handle form submission
        const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password}),
      });

      const json = await response.json();

      if (json.success){
        // redirect
        localStorage.setItem('token', json.authToken);
        localStorage.setItem('userName', json.user.name); // Save user name
        const userName = localStorage.getItem('userName');
        props.showAlert(`Welcome ${userName}`, "success")
        history("/")
      }
      else {
        // display error message
        props.showAlert("Invalid credentials", "danger")
      }
    };

    const onChange = (e) => {
        setcredentials({...credentials, [e.target.name]: e.target.value});
      }

  return (
    <div className="container my-3">
      <h2>Login Here</h2>
      <form onSubmit={handSubmit}>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            value={credentials.password}
            name="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
