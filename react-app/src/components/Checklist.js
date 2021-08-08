import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './styles/Checklist.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { change_checklist_name_thunk } from '../store/cards_store';


const Checklist = (props) => {
    const dispatch = useDispatch();
    const [editname, seteditname] = useState(false)
    const [checklistname, setchecklistname] = useState('')


    function openedit(){
        seteditname(true)
        return
    }

    const changechecklistname = (checklistid, checklist_name) => {

        const regex = /^\s*$/
        let name_to_pass;
        if (checklistname.match(regex)) {
            name_to_pass = "Please Name Your Checklist"
        } else {
            name_to_pass = checklist_name
        }

        function changechecklistname2() {

            dispatch(change_checklist_name_thunk(checklistid, name_to_pass, props.checklist.card_id));
            setchecklistname('');
            seteditname(false);
        }
        return changechecklistname2
    }

    return (
        <div>
            {!editname && <div>{props.checklist.name}</div>}
            {editname &&
            <div>
                <input
                className='checklistinput'
                type='text'
                placeholder="new checklist name?"
                name="editchecklistlistname"
                value={checklistname}
                onChange={(e) => setchecklistname(e.target.value)}
                />
                <button
            className="checklistbutton"
            onClick={changechecklistname(props.checklist.id.toString(), checklistname)}>Submit
                </button>
            </div>
            }

            <div className="bullet-container">


            </div>
            <button
            className="checklistbutton"
            onClick={openedit}
            >Change checklist name
            </button>

            <button>Fix Delete Checklist button</button>
        </div>
    )
}

export default Checklist
