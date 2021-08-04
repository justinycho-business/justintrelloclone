import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './styles/Home.css'
import { getHomeBoardData } from '../store/boards';

const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    //Grab from Redux
    const user = useSelector(state => state?.session?.user);
    const userboards = useSelector(state => state?.boards?.userboards);

    //UseEffect. Grab stuff from back end
    useEffect(
        () => {
        dispatch(getHomeBoardData(user?.id))
        }, [dispatch]
    )

    const toboard = (boardid) => {
        const stringid = boardid.toString()
        function go() {
            history.push(`/board/${stringid}`)
            return
        }

        return go

    }

    return (
        <>
        {user == null &&
      <div className='row-home'>
          <h1 className="HomeTitle">Justin's Trello Clone</h1>
          <h2>Use the login button on the nav bar and click "demo login"</h2>
          </div>
          }

        {user !== null &&

        <div className='row-home'>
        <h1 className="HomeTitle">Justin's Trello Clone</h1>

        <h2> My Boards </h2>
            <ul>
                {userboards && userboards.userboards.map(board => (
                    <li key={board.id}>
                        <button
                        className="boardbutton"
                        onClick={toboard(board.id)}
                        >{board.name}</button>
                    </li>
                ))

                }
            </ul>

        </div>
    }

          </>
          );
};

export default Home;
