
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './styles/NavBar.css'


const NavBar = () => {

  //check Redux
  const user = useSelector(state => state?.session?.user);
  const createBoard = () => {


  }

  return (
    // <div className="navindiv">
    <nav className="navbar">
      {/* <ul className="navbarUL"> */}
      <div className="navbardiv">
          <NavLink to='/' exact={true} activeClassName='active' className='navlink'>
            Home
          </NavLink>
        </div>
        {user !== null && <div className="navbardiv">
          <button className = "navlink" onClick={createBoard}>fix + Board</button>
        </div>}
        <div className="navbardiv">
          <NavLink to='/login' exact={true} activeClassName='active' className='navlink'>
            Login
          </NavLink>
        </div>
        <div className="navbardiv">
          <NavLink to='/sign-up' exact={true} activeClassName='active' className='navlink'>
            Sign Up
          </NavLink>
        </div>
        {/* <div className="navbardiv">
          <NavLink to='/users' exact={true} activeClassName='active' className='navlink'>
            Users
          </NavLink>
        </div> */}
        {user !== null && <div className="navbarUL" className='navbardiv dropdown'>
          User
          <div className='dropdown-content'><LogoutButton /> </div>
          <div className='dropdown-content'>hi </div>
        </div>}
    </nav>

  );
}

export default NavBar;
