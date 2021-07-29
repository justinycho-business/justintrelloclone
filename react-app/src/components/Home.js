import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './styles/Home.css'
import getUserBoardData from '../store/boards'

const Home = () => {
    const dispatch = useDispatch()

    //Grab from Redux
    const user = useSelector(state => state?.session?.user);

    //UseEffect. Grab stuff from back end
    useEffect(
        () => {
        // dispatch(getUserBoardData(user?.id))
        }, []
    )

    return (
        <>
        {user == null &&
      <div className='row-home'>
          Home
          </div>
          }

        {user !== null &&
        <div>
        <div className='row-home'>
        Home
        </div>
        <div> My Boards
            <ul>

            </ul>
        </div>
        </div>
    }

          </>
          );
};

export default Home;
