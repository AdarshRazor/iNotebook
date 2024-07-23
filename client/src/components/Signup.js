import React, { useState } from "react";
import {useNavigate }  from "react-router-dom";

function Signup(props) {
  const [credentials, setcredentials] = useState({name: "", email: "", password: "", invite: ""});
  let history = useNavigate();

  const handSubmit = async (e) => {
    e.preventDefault();

    if (credentials.invite !== "244466666") {
      props.showAlert("Invalid invite code", "danger");
      return; // Stop form submission if invite code is incorrect
    }
    // TODO: handle form submission
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      }),
    });
    const json = await response.json();

    if (json.success) {
      // redirect
      localStorage.setItem("token", json.authToken);
      localStorage.setItem('userName', json.user.name); // Save user name
      history("/");
      props.showAlert("Account created successfully", "success")
    } else {
      // display error message
      props.showAlert("Invalid credentials", "danger")
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Signup Please</h2>
      <form onSubmit={handSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="cpassword">Invite Code</label>
          <input
            type="invite"
            className="form-control"
            id="invite"
            name="invite"
            placeholder="Invite Code"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
