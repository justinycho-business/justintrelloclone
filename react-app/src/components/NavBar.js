
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {create_board_thunk } from '../store/boards';
import './styles/NavBar.css'


const NavBar = () => {

  //check Redux
  const user = useSelector(state => state?.session?.user);
  const board0 = useSelector(state => state?.boards);
  const dispatch = useDispatch()
  const history = useHistory()

  const[newboardid, setnewboardid] = useState('hi')

  function redirect() {

    if(board0?.board?.board_details && newboardid !== 'hi') {
    console.log(newboardid);
    console.log(board0?.board?.board_details);
    history.push(`/board/${board0?.board?.board_details?.id}`)
    }

  }

  function createBoard() {

        dispatch(create_board_thunk(user.id))
        setnewboardid(board0?.board?.board_details?.id)
        redirect()



     return

  }

  useEffect(()=> {redirect()}, [createBoard])

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
