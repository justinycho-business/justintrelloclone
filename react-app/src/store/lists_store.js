import { bodyOpenClassName } from "react-modal/lib/components/Modal";

// Define action types
const GET_CARDS = 'list/GET_CARDS';

const CREATE_CARD = 'list/CREATE_CARD';

const CHANGE_CARD_NAME = 'list/CHANGE_CARD_NAME';

const DELETE_CARD = 'list/DELETE_CARD'

// Action Creators
const getcarddata = (carddata) => ({
    type:  GET_CARDS,
    payload: carddata
})

const create_card_data = (carddata) => ({
    type:  CREATE_CARD,
    payload: carddata
})

const change_card_name = (carddata) => ({
    type:  CHANGE_CARD_NAME,
    payload: carddata
})

const delete_card = (carddata) => ({
    type:  DELETE_CARD,
    payload: carddata
})


// Define Thunks
export const get_card_data = (listid) => async (dispatch) => {
    const response = await fetch(`/api/list/${listid}`)

    if(response.ok) {
        const card_data = await response.json();
        dispatch(getcarddata(card_data));
        console.log(card_data);
    }
}

export const create_card_thunk = (listid, cardlength) => async (dispatch) => {
    const response = await fetch(`/api/list/create-card/${listid}`, {
        method: ['POST'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({ 'cardlength': cardlength
                                   })


    })

    if(response.ok) {
        const card_data = await response.json();
        dispatch(create_card_data(card_data));
        console.log(card_data);
    }
}

export const change_card_name_thunk = (card_id, card_name, string_list_id) => async (dispatch) => {
    const response = await fetch(`/api/list/change-name-card/${card_id}`, {
        method: ['PUT'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'cardid': card_id,
            'cardname': card_name,
            'listid': string_list_id
                                   })


    })

    if(response.ok) {
        const card_data = await response.json();
        dispatch(change_card_name(card_data));
        console.log(card_data);
    }

}

export const delete_card_thunk = (cardid, listid) => async (dispatch) => {
    const response = await fetch(`/api/list/delete-card/${cardid}`, {
        method: ['DELETE'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'cardid': cardid,
            'listid': listid
                                   })


    })

    if(response.ok) {
        const card_data = await response.json();
        dispatch(delete_card(card_data));
        console.log(card_data);
    }
}
// Define initial state
const initialState = {}

  // Define reducer
export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CARDS:
            let getCardState = {...state}
            getCardState[action.payload['listid']] = action.payload
            return getCardState
        case CREATE_CARD:
            let createCardState = {...state}
            createCardState[action.payload['listid']] = action.payload
            return createCardState
        case CHANGE_CARD_NAME:
            let changeCardName = {...state}
            changeCardName[action.payload['listid']] = action.payload
            return changeCardName
        case DELETE_CARD:
            let deleteCardState = {...state}
            deleteCardState[action.payload['listid']] = action.payload
            return deleteCardState
            // case DELETE_LIST:
        //     let afterDeleteState = {...state}
        //     afterDeleteState['board']['list_order'] = action.payload['list_order']
        //     afterDeleteState['board']['lists_in_board'] = action.payload['lists_in_board']
        //     return afterDeleteState

        default:
            return state;
    };
};
