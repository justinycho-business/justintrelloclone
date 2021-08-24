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
        if(user !== null ){
            dispatch(getHomeBoardData(user?.id))}
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
      <div className='row-home-1'>
          <div className='col-1'>
          <h1 className="HomeTitle">Justin's Trello Clone (Jrello)</h1>
          {/* <h2>Use the login button on the nav bar and click "demo login"</h2>
              <h2>*Suggested use with 75% zoom on google chrome*
          </h2> */}
          <img className="justingif" src="https://i.ibb.co/vcz2hn5/justin-trello-gif.gif" alt="justin-trello-demo" />
          </div>
          <div className='col-0'>


          </div>

          </div>
          }

        {user !== null &&

        <div className='row-home'>
        <h1 className="HomeTitle">Justin's Trello Clone</h1>

        <h2> My Boards </h2>
            <ul>
                {userboards && userboards.userboards && userboards.userboards.map(board => (
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
