import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './styles/Checklist.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { change_checklist_name_thunk,
    delete_checklist_thunk } from '../store/cards_store';
import { get_bullets_for_checklist, create_bullet_thunk } from '../store/checklists_store';
import Bullet from './Bullet';

const Checklist = (props) => {
    const dispatch = useDispatch();
    const [editname, seteditname] = useState(false)
    const [checklistname, setchecklistname] = useState('')

    const checklists_redux = useSelector(state => state?.checklists);
    const cards_redux = useSelector(state => state?.cards);

    const get_bullets_array = (dict) => {
        let array = Object.values(dict)
        for(let i = 0; i < array.length; i++) {
            if(array[i]['checklistid'] === props.checklist.id) {
                let bullet_dict = array[i]['bulletdict']
                return Object.values(bullet_dict)

            }
        }
        return []
    }

    const deleteChecklist = (checklistid) => {
        const string_checklist_id = checklistid.toString()
        function dispatch_delete_checklist() {
            dispatch(delete_checklist_thunk(string_checklist_id, props.checklist.card_id))
        }

        return dispatch_delete_checklist

    }

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

    useEffect(
        () => {
            let cards = Object.values(cards_redux)
            for (let i = 0; i < cards.length; i++) {
                if (cards[i]['cardid'] === props.checklist.card_id) {
                    let checklists = Object.values(cards[i]['checklistdict'])
                    for (let j = 0; j < checklists.length; j++)
                        if (checklists[j]['id'] === props.checklist.id) {
                            const req = dispatch(get_bullets_for_checklist(checklists[j]['id']))
                        }
                }
            }

        }
        , [dispatch]
      )

    const createNewBullet = (checklistid) => {
    function dispatch_create_bullet() {
        dispatch(create_bullet_thunk(checklistid))
    }

    return dispatch_create_bullet
    }

    return (
        <div className='whole-checklist'>
            <div className='checklist-items-container'>
            {!editname && <div className='checklist-title'>{props.checklist.name}</div>}
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
                    <div>
                    <button
                    className="checklistbutton"
                    onClick={openedit}
                    > Change Name
                    </button>

                    <button
                    className="checklistbutton"
                    onClick={deleteChecklist(props.checklist.id)}
                    > Delete </button>
                    </div>
            </div>

            <div className="bullet-container">

                {checklists_redux && Object.values(checklists_redux).length > 0 &&
                                get_bullets_array(checklists_redux).map(bullet => (
                                  <Bullet
                                  key={bullet.id}
                                  bullet={bullet}
                                  />
                                ))
                              }


            </div>
            <button onClick={createNewBullet(props.checklist.id)}>Create New Bullet</button>

        </div>
    )
}

export default Checklist
