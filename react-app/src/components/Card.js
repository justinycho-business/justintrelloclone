import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get_card_data,
    create_card_thunk,
    change_card_name_thunk,
    delete_card_thunk} from '../store/lists_store';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './styles/Card.css'

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

const Card = (props) => {
    const dispatch = useDispatch();
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


     //useState
     const [cardname, setcardname] = useState('')
     const [dragBlocking, setdragblocking] = useState(false);

     //functions

     const changecardname = (cardid, card_name) => {
      function changecardname2() {
          console.log('dispatch change_list_name_thunk');
          dispatch(change_card_name_thunk(cardid, card_name, (props.card.list_id).toString()));
          setcardname('');
          setIsOpen(false);
      }
      return changecardname2
  }

  const deleteCard = (cardid) => {
    // e.preventDefault();
    // delete board.lists_in_board[listid]
    const string_card_id = cardid.toString()
    function dispatch_delete_card() {
        console.log('inside dispatch_delete_list');
        dispatch(delete_card_thunk(string_card_id, (props.card.list_id).toString()))
        console.log("after deleting");
        // dispatch(getUserBoardData(stringboardid))
    }

    return dispatch_delete_card
    //useeffect
}


    return (
      <Draggable
      disableInteractiveElementBlocking={!dragBlocking}
      draggableId={`card-${props.card.id.toString()}`}
      index={props.index}
      >
        {(provided) => (
    <div
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    ref = {provided.innerRef}
    className='card'>
        <div>{props.card.name}</div>
        <button
            className="cardbutton"
            onClick={
                openModal
                }
        > -Edit/Delete Card- </button>

                    <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel={props.card.name}
                        >
                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{props.card.name}</h2>
                            <div>Edit Card </div>
                            <form>
                            {/* <input
                            type='hidden'
                            value={parseInt(list.id)}
                            /> */}
                            <input
                            className='listmodalinput'
                            type='text'
                            placeholder="Give this card a new name"
                            name="editcardname"
                            value={cardname}
                            onChange={(e) => setcardname(e.target.value)}
                            />
                            <button
                            className="cardbutton"
                            onClick={changecardname(props.card.id.toString(), cardname)}
                            >Submit new name</button>
                            {/* <button onClick={changelistname(list.id.toString(), listname)}>Submit new name</button> */}
                            {/* <button>stays</button>
                            <button>inside</button>
                            <button>the modal</button> */}
                            </form>
                            {/* <button
                            className="cardbutton"
                            onClick={changecardname(props.card.id.toString(), cardname)}
                            >Submit new name</button> */}

                            <button
                              className="cardbutton"
                              onClick={deleteCard(props.card.id)}>Delete This Card</button>
                            <button
                            className="cardbutton"
                            onClick={closeModal}>close</button>
                        </Modal>





    </div>
    )}
    </Draggable>
    )
}

export default Card
