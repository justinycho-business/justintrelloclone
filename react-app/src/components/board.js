import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserBoardData } from '../store/boards';
import './styles/Board.css';

const Board = () => {
    const dispatch = useDispatch();
    const stringboardid = useParams().boardid
    const intboardid = parseInt(stringboardid)

    useEffect(
        () => {
            console.log("in useeffect")
           dispatch(getUserBoardData(stringboardid))
        }
        , []
    )



    return (
        <div>Board</div>
    )
}

export default Board
