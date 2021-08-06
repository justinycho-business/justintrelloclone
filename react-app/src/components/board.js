import { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getUserBoardData,
        delete_list_thunk,
        create_list_thunk,
        change_board_name_thunk,
        delete_board_thunk,
        list_reorder_thunk,
        change_list_name_thunk } from '../store/boards';
import {card_reorder_same_list_thunk, card_reorder_both_thunk} from '../store/lists_store'
import React from 'react';
import List from './list';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './styles/Board.css';

import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';

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

const Board = () => {
    const dispatch = useDispatch();
    const stringboardid = useParams().boardid
    const intboardid = parseInt(stringboardid)

    const history = useHistory()

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
    const list_order_in_redux = useSelector(state => state?.boards?.board?.list_order);
    const card_orders = useSelector(state => state?.lists);


    //make the constants needed for this component
    const list_to_array = (dict) => {
        let result = []
        let array = Object.keys(dict)
        for (let i=0; i < array.length; i++) {
            result.push(dict[array[i]])
        }
        return result
    }
    const [boardname, setboardname] = useState('')
    const [listorder, setlistorder] = useState([])
    const [listorder_2, setlistorder2] = useState([])

    // const [list_array, setlist_array] = useState([])

    // const changelistname = (listid, list_name) => {
    //     function changelistname2() {
    //         console.log('dispatch change_list_name_thunk');
    //         dispatch(change_list_name_thunk(listid, list_name, stringboardid));
    //         setlistname('');
    //         setIsOpen(false);
    //     }
    //     return changelistname2
    // }

    const changeboardname = (boardid, board_name) => {
        function changeboardname2() {
            const req = dispatch(change_board_name_thunk(boardid, board_name, user.id));
            if (!req) {
                window.alert('Error!')
            }
            setboardname('');
            setIsOpen(false);
        }
        return changeboardname2
    }

    const deleteList = (listid) => {
        // e.preventDefault();
        // delete board.lists_in_board[listid]
        const string_list_id = listid.toString()
        function dispatch_delete_list() {

            const req = dispatch(delete_list_thunk(string_list_id, stringboardid))
            if (!req) {
                window.alert('Error!')
            }
            // dispatch(getUserBoardData(stringboardid))
        }

        return dispatch_delete_list
        //useeffect
    }

    const deleteBoard = (boardid) => {
        // e.preventDefault();
        // delete board.lists_in_board[listid]
        function dispatch_delete_board() {
            const req = dispatch(delete_board_thunk(boardid, history))
            if (!req) {
                window.alert('Error!')
            }

            // history.push(`/`)
            // dispatch(getUserBoardData(stringboardid))
        }

        return dispatch_delete_board
        //useeffect
    }

    const createList = () => {
        const req = dispatch(create_list_thunk(stringboardid, list_order_in_redux.length))
        if (!req) {
            window.alert('could not make list')

        }
        // dispatch(getUserBoardData(stringboardid))
        return
    }

    useEffect(
            () => {
               const req = dispatch(getUserBoardData(stringboardid))
               if (!req) {
                window.alert('Error!')
            }
            //    if (board.lists_in_board) {
            //     setlist_array(list_to_array(board.lists_in_board))
            //    }
            }
            , [dispatch
                // , list_array.length

                // , board
                // , Object.keys( b_trial?.board?.lists_in_board)?.length
            ]

        )

    const reorder = (list, startIndex, endIndex) => {
        const result = list;
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
        };

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId.startsWith("list") && !destination.droppableId.startsWith("list")) {
            return
        }

        if (!source.droppableId.startsWith("list") && destination.droppableId.startsWith("list")) {
            return
        }


        function extract(string) {
            let splitty = string.split('-')
            const list_id = parseInt(splitty[1])
            return list_id
        }


        if (draggableId.startsWith('card')) {
            if (!destination) {
                return;
            }

            if (source.droppableId.startsWith("list") && !destination.droppableId.startsWith("list")) {
                return
            }

            if (!source.droppableId.startsWith("list") && destination.droppableId.startsWith("list")) {
                return
            }

            if (destination.droppableId === source.droppableId) {

                let listid = extract(destination.droppableId)

                let list_array;

                for (let i = 0; i < listorder_2.length; i++) {
                    if (listorder_2[i]['listid'] === listid) {
                        list_array = listorder_2[i]['order']
                    }
                }

                const order_2 = reorder(
                    list_array,
                    result.source.index,
                    result.destination.index
                )
                const req = dispatch(card_reorder_same_list_thunk(order_2, listid.toString()))

                return


            }

            if (source.droppableId.startsWith("list") && destination.droppableId.startsWith("list")
                && extract(source.droppableId) !== extract(destination.droppableId)) {

                let sourcelistid = extract(source.droppableId);
                let destinationlistid = extract(destination.droppableId);

                let source_list_array;
                let destination_list_array;

                for (let i = 0; i < listorder_2.length; i++) {
                    if (listorder_2[i]['listid'] === sourcelistid) {
                        source_list_array = listorder_2[i]['order']
                    }
                    if (listorder_2[i]['listid'] === destinationlistid) {
                        destination_list_array = listorder_2[i]['order']
                    }
                }

                const card_moved = source_list_array.splice(source.index, 1);
                const new_source_list_array = source_list_array;


                const [removed] = card_moved
                destination_list_array.splice(destination.index, 0, removed);
                const new_destination_list_array = destination_list_array;

                const req = dispatch(card_reorder_both_thunk(sourcelistid,
                                                             destinationlistid,
                                                             removed,
                                                             new_source_list_array,
                                                             new_destination_list_array,
                                                             destination.index ))

                }
        }

        if (draggableId.startsWith('list')) {
            if (!destination) {
                return;
            }
            const order = reorder(
                listorder,
                result.source.index,
                result.destination.index
            )

            setlistorder(order);
            const req = dispatch(list_reorder_thunk(order, stringboardid))
            if (!req) {
            window.alert('Error!')
        }

        }

        return
    };

    const onDragStart = () => {
        setlistorder(list_order_in_redux)
        if(card_orders) {
        setlistorder2(Object.values(card_orders))
        }
    }



    if(user.id !== board?.board_details?.user_id) {
        return (
            <div className='boardcontainer'>You do not own this board or this board does not exist</div>
        )
    }

    return (
        <div>
        <div className="boardcontainer">
        {board && <h1 className="boardname">{board.board_details.name}</h1>}
        {board && <button className="board_button" onClick={openModal}>Edit/Delete board</button>}

            <DragDropContext
                onDragStart = {onDragStart}
                // onDragUpdate
                onDragEnd ={onDragEnd}
            >

            { board && board.list_order &&
            <div className="border-1">
            {/* // <div className="list-container"> */}
            <Droppable droppableId={stringboardid} type="COLUMN" direction="horizontal" >
                {(provided) => (

                    <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className='boardDroppable'
                    >

                        {/* {list_to_array(board.lists_in_board).map((list, index) => (
                        <List

                        key={list.id}
                        list={list}
                        index={index}
                        className="border-2"/>

                         ))} */}

                    {board.list_order.map((list, index) => (
                        <List

                        key={list.id}
                        list={list}
                        index={index}
                        className="border-2"/>

                         ))}



                        {provided.placeholder}
                 </div>

                )}
            </Droppable>
                            {/* </div> */}
            </div>}

            {board && <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel={board.board_details.name}
                    >
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{board.board_details.name}</h2>
                        <div>Edit/Delete Board </div>
                        <form>
                        {/* <input
                        type='hidden'
                        value={parseInt(list.id)}
                        /> */}
                        <input
                        className="boardeditinput"
                        type='text'
                        placeholder="Give this board a new name"
                        name="editboardname"
                        value={boardname}
                        onChange={(e) => setboardname(e.target.value)}
                        />
                        {/* <button onClick={changelistname(list.id.toString(), listname)}>Submit new name</button> */}
                        {/* <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button> */}
                        </form>
                        <button className="board_button" onClick={changeboardname(stringboardid, boardname)}>Submit new name</button>
                        <button className="board_button" onClick={deleteBoard(stringboardid)}>Delete This Board</button>
                        <button className="board_button" onClick={closeModal}>close</button>
                    </Modal>}

            <button
             className="board_button"
             onClick={createList}>Create New List</button>
        </DragDropContext>
        </div>
        </div>
    )
}

export default Board
