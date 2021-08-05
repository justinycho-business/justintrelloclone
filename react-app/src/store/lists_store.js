import { bodyOpenClassName } from "react-modal/lib/components/Modal";

// Define action types
const GET_CARDS = 'list/GET_CARDS';

const CREATE_CARD = 'list/CREATE_CARD'

// Action Creators
const getcarddata = (carddata) => ({
    type:  GET_CARDS,
    payload: carddata
})

const create_card_data = (carddata) => ({
    type:  CREATE_CARD,
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

        // case DELETE_LIST:
        //     let afterDeleteState = {...state}
        //     afterDeleteState['board']['list_order'] = action.payload['list_order']
        //     afterDeleteState['board']['lists_in_board'] = action.payload['lists_in_board']
        //     return afterDeleteState

        default:
            return state;
    };
};
