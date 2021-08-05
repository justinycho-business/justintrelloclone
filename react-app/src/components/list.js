import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getUserBoardData,
        delete_list_thunk,
        create_list_thunk,
        change_list_name_thunk } from '../store/boards';
import { get_card_data } from '../store/lists_store';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './styles/List.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card'


//styling for modal
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

//   Modal.setAppElement(document.querySelector('root'));
  Modal.setAppElement(document.getElementById('root'))

const List = (props) => {
    const dispatch = useDispatch();
    const stringboardid = useParams().boardid
    const intboardid = parseInt(stringboardid)

    //modal stuff
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
      setIsOpen(true);
    }

    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = 'blue';
    }

    function closeModal() {
      setIsOpen(false);
    }
    //modal stuff done


    const listModal = () => {
        return
    }

    //redux information
    const user = useSelector(state => state?.session?.user);
    const board = useSelector(state => state?.boards?.board)
    const b_trial = useSelector(state => state?.boards);
    const all_lists = useSelector(state => Object.keys(state?.boards?.board?.lists_in_board));
    const cards_exist = useSelector(state => state?.lists);

    const card_filter = (array) => {
        console.log(array, "line 68===========")
        const filtered = array.filter(ele => parseInt(ele['listid']) === parseInt(props.list.id))
        if(filtered.length > 0) {
        const ordered_cards = filtered[0]['order']
        return ordered_cards
    }
    else {
        return []
    }
    }
    //make the constants needed for this component
    const list_to_array = (dict) => {
        let result = []
        let array = Object.keys(dict)
        for (let i=0; i < array.length; i++) {
            result.push(dict[array[i]])
        }
        return result
    }
    const [listname, setlistname] = useState('')
    // const [list_array, setlist_array] = useState([])

    const changelistname = (listid, list_name) => {
        function changelistname2() {
            console.log('dispatch change_list_name_thunk');
            dispatch(change_list_name_thunk(listid, list_name, stringboardid));
            setlistname('');
            setIsOpen(false);
        }
        return changelistname2
    }

    const deleteList = (listid) => {
        // e.preventDefault();
        // delete board.lists_in_board[listid]
        const string_list_id = listid.toString()
        function dispatch_delete_list() {
            console.log('inside dispatch_delete_list');
            dispatch(delete_list_thunk(string_list_id, stringboardid))
            console.log("after deleting");
            // dispatch(getUserBoardData(stringboardid))
        }

        return dispatch_delete_list
        //useeffect
    }

    useEffect(
        () => {
            console.log("in useeffect")
            for(let i = 0; i < all_lists.length; i++) {
                dispatch(get_card_data(all_lists[i]))
            }

        }
        , [dispatch

        ]

    )




    return (
    <Draggable draggableId = {props.list.id.toString()} index={props.index}>
        {(provided) => (
            <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref = {provided.innerRef}
            className='border-2'
            >


                <div className='list_in_board' key={props.list.id}>
                    {props.list.name}
                </div>

                <div className="card-container">
                    {Object.keys(cards_exist).length > 0 &&
                    card_filter(Object.values(cards_exist)).map((card, index) => (
                        <Card
                        key={card.id}
                        card={card}
                        index={index}
                        className="border-3"/>

                    ))



                    }
                </div>

                <button
                className="listbutton"
                onClick={deleteList(props.list.id)}>Delete This List</button>
                <button
                className="listbutton"
                onClick={
                openModal
                }
                >Open Modal Edit List</button>
                {/* <Post post={post}/> */}


                <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel={props.list.name}
                        >
                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{props.list.name}</h2>
                            <div>Edit List </div>
                            <form>
                            {/* <input
                            type='hidden'
                            value={parseInt(list.id)}
                            /> */}
                            <input
                            className='listmodalinput'
                            type='text'
                            placeholder="Give this list a new name"
                            name="editlistname"
                            value={listname}
                            onChange={(e) => setlistname(e.target.value)}
                            />
                            {/* <button onClick={changelistname(list.id.toString(), listname)}>Submit new name</button> */}
                            {/* <button>stays</button>
                            <button>inside</button>
                            <button>the modal</button> */}
                            </form>
                            <button
                            className="listbutton"
                            onClick={changelistname(props.list.id.toString(), listname)}>Submit new name</button>
                            <button
                            className="listbutton"
                            onClick={closeModal}>close</button>
                        </Modal>
            {provided.placeholder}



        </div>





        )}

    </Draggable>

    )
}

export default List
