import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './styles/Home.css'
import { getHomeBoardData } from '../store/boards';

import { Redirect } from 'react-router-dom';
import { login } from '../store/session';

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
    const demoLogin = async (e) => {
        e.preventDefault();
        // await setEmail('demo@aa.io')
        // await setPassword('password')
        const email = 'demo@aa.io'
        const password = 'password'

        const data = await dispatch(login(email, password));
        if (data) {
          window.alert("try logging in through the login form")
        }
        window.location.reload()
      };

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
          <button className="cloud" onClick={demoLogin}>Demo Login</button>;
          </div>
          <div className="col-2">
          <p className="tilda">~</p>
            <p className='p-tag'>With an obsession for organization and project management, I created Jrello, inspired by Trello's simple yet powerful capabilities.</p>
            <img className="star" src="https://i.ibb.co/FnCv2wH/icons8-starfish-80-removebg-preview.png"></img>
            <p className='p-tag'>Planning should be a fun activity, so my theme is pastel colors and the ocean.</p>
            <p className="tilda">~</p>
          </div>
          <div className='col-0'>

            <div className="grid-imgs">


            <img className="img-7" src="https://i.ibb.co/F86KN5M/nathan-ziemanski-Py-Vu-Rj-Sb9-Jo-unsplash.jpg"></img>
            <img className="img-2" src="https://i.ibb.co/bzMBMVv/elizabeth-lies-ZWPer-Nlq-Uu0-unsplash.jpg"></img>
            <img className="img-3" src="https://i.ibb.co/XLF7RPw/pawel-czerwinski-qzt-BRIr-U1-FM-unsplash.jpg"></img>
            <img className="img-4" src="https://i.ibb.co/D5Py8TZ/halacious-0l-GVcr-AFHZQ-unsplash.jpg"></img>
            <img className="img-6" src="https://i.ibb.co/4dYKrTY/eberhard-grossgasteiger-S-2-Ukb-Vqp-A-unsplash.jpg"></img>
            <img className="img-5" src="https://i.ibb.co/Z81RpJr/airfocus-v89zhr0i-BFY-unsplash.jpg"></img>
            <img className="img-1" src="https://i.ibb.co/31pjrj4/annie-spratt-JGk-GBDu-ZXt4-unsplash.jpg"></img>
            <img className="img-9" src="https://i.ibb.co/Qb1Djm8/patrick-ryan-3k-UIa-B2-EPp8-unsplash.jpg"></img>
            <img className="img-8" src="https://i.ibb.co/R0y1Z9T/ocean.jpg"></img>

            </div>



          </div>

          </div>
          }

        {user !== null &&

        <div className='row-home'>
        <h1 className="HomeTitle2">Justin's Trello Clone (Jrello)</h1>

        <h2 className="boards"> My Boards </h2>

                {userboards && userboards.userboards && userboards.userboards.map(board => (
                    <div key={board.id}>
                        <button
                        className="boardbutton"
                        onClick={toboard(board.id)}
                        >{board.name}</button>
                    </div>
                ))

                }


        </div>
    }

          </>
          );
};

export default Home;
