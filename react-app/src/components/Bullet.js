import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {change_bullet_content_thunk, delete_bullet_thunk, completed_bullet_thunk} from '../store/checklists_store';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './styles/Bullet.css';


const Bullet = (props) => {
    const dispatch = useDispatch();

    const [bulletcontent, setbulletcontent] = useState(props.bullet.content)
    const [bulletcontentedit, setbulletcontentedit] = useState(false)
    const checklist_info = useSelector(state => state?.checklists)
    const [checked, setchecked] = useState(checklist_info[props.bullet.checklist_id]['bulletdict'][props.bullet.id]['completed'])



    const change_bullet_content = (bulletid, bullet_content) => {
        const regex = /^\s*$/
        let content_to_pass;
        if (bullet_content.match(regex)) {
            content_to_pass = "Bullets require content"
        } else {
            content_to_pass = bullet_content
        }

        function change_bullet_content2() {

            dispatch(change_bullet_content_thunk(bulletid, content_to_pass, props.bullet.checklist_id));
            setbulletcontentedit(false);
        }
        return change_bullet_content2
    }

    const editcontent = () => {
        setbulletcontentedit(true)
    }

    const deleteBullet = (bulletid) => {

        function dispatch_delete_bullet() {
            dispatch(delete_bullet_thunk(bulletid, props.bullet.checklist_id))
        }

        return dispatch_delete_bullet

    }

    const changecheckbox = () => {
        dispatch(completed_bullet_thunk(props.bullet.id, props.bullet.checklist_id))
        setchecked(!checked)
        return
    }



    return (
        <div className="bullet-whole">
        <div className='bullet-content'>
            {!checked && <img className="img-check" onClick={changecheckbox} src="https://i.ibb.co/Lzr8g11/empty-checkbox.png" height='25px'/>}
            {checked && <img className="img-check" onClick={changecheckbox} src="https://i.ibb.co/Rz4hFhD/icons8-checked-checkbox-96.png" height='25px'/>}


            {!bulletcontentedit &&<span className='bullet-content'> {props.bullet.content}</span>}
            {bulletcontentedit && <div>
                <textarea
                className='bulletinput'
                type='text'
                placeholder="bullet content"
                name="editbulletconent"
                value={bulletcontent}
                onChange={(e) => setbulletcontent(e.target.value)}
                />
                <button
            className="bullet-button"
            onClick={change_bullet_content(props.bullet.id.toString(), bulletcontent)}>Submit
                </button>
            </div>}

        </div>
        <div>
            <button
            onClick={editcontent}
            className="bullet-button">Edit</button>
            <button
            className="bullet-button"
            onClick={deleteBullet(props.bullet.id.toString())}
            >Delete</button>
        </div>
        </div>

    )
}
export default Bullet
