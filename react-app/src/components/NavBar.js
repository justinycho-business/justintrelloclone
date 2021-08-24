
import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
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
  const board_details_id = useSelector(state => state?.boards?.board?.board_details?.id);
  const dispatch = useDispatch()
  const history = useHistory()

  const[newboardid, setnewboardid] = useState('hi')
  const [showdropdown, setshowdropdown] = useState(false)

  // function redirect() {

  //   if(board0?.board?.board_details && newboardid === board0?.board?.board_details?.id) {
  //   console.log(newboardid);
  //   console.log(board0?.board?.board_details);
  //   history.push(`/board/${board0?.board?.board_details?.id}`)
  //   }

  // }
  function myboard() {
    history.push('/')
  }

  function dropdown() {
    if (showdropdown) {
      setshowdropdown(false)
    } else {
      setshowdropdown(true)
    }
    return
  }
  function createBoard() {

      dispatch(create_board_thunk(user.id, history))

     return

  }

  // useEffect(
  //   ()=> {
  //     redirect()
  //   }, [board_details_id])

  return (
    // <div className="navindiv">
    <nav className="navbar">
      {/* <ul className="navbarUL"> */}
      {/* <div className="navbardiv">
          <NavLink to='/' exact={true} activeClassName='active' className='navlink'>
            Home/My Boards
          </NavLink>
        </div> */}
        {user === null && <div className="navbardiv">
          {/* <NavLink to='/' exact={true} activeClassName='active' className='navlink'>
            Home
          </NavLink> */}
          <button className = "cloud" onClick={myboard}>Home</button>
        </div>}
        {user !== null && <div className="navbardiv">
          {/* <NavLink to='/' exact={true} activeClassName='active' className='navlink'>
            My Boards
          </NavLink> */}
          <button className = "cloud" onClick={myboard}>My Boards</button>
        </div>}

        {user !== null && <div className="navbardiv">
          <button className = "cloud" onClick={createBoard}>Create New Board</button>
        </div>}
        {user == null && <div className="navbardiv">
          <NavLink to='/login' exact={true} activeClassName='active' className='cloud'>
            Login
          </NavLink>
        </div>}
        {user == null && <div className="navbardiv">
          <NavLink to='/sign-up' exact={true} activeClassName='active' className='cloud'>
            Sign Up
          </NavLink>
        </div>}
        {/* <div className="navbardiv">
          <NavLink to='/users' exact={true} activeClassName='active' className='navlink'>
            Users
          </NavLink>
        </div> */}
        {user !== null && <div className='navbardiv'>
        <button className = "cloud" onClick={dropdown}>User Menu</button>
        {user !== null && showdropdown && <div
          className='dropdown-content'
          ><LogoutButton /> </div>}
        </div>}


    </nav>


  );
}

export default NavBar;
