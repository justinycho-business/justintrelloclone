import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get_card_data,
    create_card_thunk,
    change_card_name_thunk,
    delete_card_thunk} from '../store/lists_store';
    import {get_checklists_for_card,
      create_checklist_thunk} from "../store/cards_store"
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Checklist from './Checklist';
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
      width: '50%',
      transform: 'translate(-50%, -50%)',
      border: '5px solid wheat',
      borderRadius: "10px",
      backgroundColor: "rgb(255, 241, 205)",

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
      //  subtitle.style.color = 'blue';
     }

     function closeModal() {
       setIsOpen(false);
     }
     //modal stuff done


     //useState
     const [cardname, setcardname] = useState('')
     const [dragBlocking, setdragblocking] = useState(false);
     const [cardnameedit, setcardnameedit] = useState(false);

     const cards_exist = useSelector(state => state?.lists);
     const checklist_exist = useSelector(state => state?.cards);

     //functions

     const changecardname = (cardid, card_name) => {
      const regex = /^\s*$/
      let name_to_pass;
      if (cardname.match(regex)) {
          name_to_pass = "Please Name Your Card"
      } else {
          name_to_pass = card_name
      }

      function changecardname2() {

          dispatch(change_card_name_thunk(cardid, name_to_pass, (props.card.list_id).toString()));
          setcardname('');
          setcardnameedit(false);
      }
      return changecardname2
  }

  const deleteCard = (cardid) => {
    // e.preventDefault();
    // delete board.lists_in_board[listid]
    const string_card_id = cardid.toString()
    function dispatch_delete_card() {
        dispatch(delete_card_thunk(string_card_id, (props.card.list_id).toString()))
        // dispatch(getUserBoardData(stringboardid))
    }

    return dispatch_delete_card
    //useeffect
}

const createNewChecklist = (cardid) => {
  function dispatch_create_checklist() {
    dispatch(create_checklist_thunk(cardid))
  }

  return dispatch_create_checklist
}

const checklistdict_to_array = (cardid) => {
  let array = Object.values(checklist_exist)
  let checklists;
  for (let i = 0; i < array.length ; i++) {
    if (array[i]['cardid'] === cardid) {
      checklists = array[i]['checklistdict']
    }
  }
  if (checklists === undefined) {
    return []
  }
  let checklistsarray = Object.values(checklists)
  // console.log(checklistsarray);

  return checklistsarray
}

const editcardname_ = () => {
  console.log(cardnameedit);
  setcardnameedit(true)
  return
}

useEffect(
  () => {
    let card_list = Object.values(cards_exist);
    let array_of_cards = [];
    for (let i = 0; i < card_list.length; i++) {
      const cardsarray = card_list[i]['order']
      for (let j = 0; j < cardsarray.length; j++) {
        if (parseInt(cardsarray[j]['id']) === parseInt(props.card.id)) {
          const req = dispatch(get_checklists_for_card(cardsarray[j]['id']))
        }
      }
    }

  }
  , [dispatch]
)


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
        <div className="card-outside-title">{props.card.name}</div>
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
                        <div className="cardnameedit">
                            {!cardnameedit && <h2 className="card-title"
                            // ref={(_subtitle) => (subtitle = _subtitle)}
                            >{props.card.name}</h2>}
                            {cardnameedit && <div>
                                <div className="newcardname">
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

                            </form>

                            <button
                            className="cardbutton"
                            onClick={changecardname(props.card.id.toString(), cardname)}
                            >Submit new name</button>
                            </div>
                            </div>

                            }


                            <button
                            className="cardbutton"
                            onClick={editcardname_}
                            >Edit Card Name</button>
                        </div>

                            <div className="checklist_container">
                              <h2 className="h2-checklist">Checklists</h2>
                              {checklist_exist && Object.values(checklist_exist).length > 0 &&
                                checklistdict_to_array(props.card.id).map(checklist => (
                                  <Checklist
                                  key={checklist.id}
                                  checklist={checklist}
                                  />
                                ))
                              }

                            </div>
                            <button
                              className="cardbutton"
                              onClick={createNewChecklist(props.card.id.toString())}>Create New Checklist</button>
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
