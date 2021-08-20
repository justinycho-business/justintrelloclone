import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './styles/Footer.css'

const Footer = () => {


    return (
        <div className="Footerdiv">
            <a
             target="_blank"
             href='https://github.com/justinycho-business/justintrelloclone'>
                <img alt="github-logo-link-to-Justin-Cho" src="https://i.ibb.co/2cP4DT6/Git-Hub-Mark-64px.png"></img>
            </a>
            <a
            className="footeratag"
            target="_blank"
            href='https://justinycho-business.github.io/'>About the Developer</a>
        </div>
    )

}

export default Footer
