import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './styles/Bullet.css';


const Bullet = (props) => {
    const dispatch = useDispatch();




    return (
        <div className="bullet-whole">
        <div className='bullet-content'>
            <img className="img-check" src="https://i.ibb.co/Lzr8g11/empty-checkbox.png" height='25px'/>
            <span className='bullet-content'> {props.bullet.content}</span>
        </div>
        <div>
            <button className="bullet-button">Edit</button>
            <button className="bullet-button">Delete</button>
        </div>
        </div>

    )
}
export default Bullet
