import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {useNavigate }  from "react-router-dom";

function Navbar(props) {
    let location = useLocation();
    let history = useNavigate()

    const handlelogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        history('/login');
        props.showAlert("Logout successfully", "success")
    }
    const userName = localStorage.getItem('userName');

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Navbar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <NavLink className={`nav-link ${location.pathname === '/' ? "active":""}`} aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className={`nav-link ${location.pathname === '/about' ? "active":""}`} to="/about">About</NavLink>
            </li>
        </ul>
        {!localStorage.getItem('token')?<form className="d-flex">
            <NavLink className="btn btn-primary mx-2" to="/login" role="button">Login</NavLink>
            <NavLink className="btn btn-success mx-2" to="/signup" role="button">Signup</NavLink>
        </form>: <form className="d-flex">
            <NavLink disabled className="btn btn-light mx-2">Login as {userName}</NavLink>
            <NavLink onClick={handlelogout} className="btn btn-danger mx-2" to="/Login" role="button">Logout</NavLink>
        </form>}
        </div>
    </div>
    </nav>
    <Outlet/>
    </>
  )
}

export default Navbar