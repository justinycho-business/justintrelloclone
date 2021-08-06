import { bodyOpenClassName } from "react-modal/lib/components/Modal";

// Define action types
const GET_CARDS = 'list/GET_CARDS';

const CREATE_CARD = 'list/CREATE_CARD';

const CHANGE_CARD_NAME = 'list/CHANGE_CARD_NAME';

const DELETE_CARD = 'list/DELETE_CARD';

const CARD_REORDER = 'list/CARD_REORDER';

const CARD_BOTH_REORDER = 'list/CARD_BOTH_REORDER';

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

const card_reorder = (cardorder) => ({
    type:  CARD_REORDER,
    payload: cardorder
})

const card_reorder_both = (cardorder) => ({
    type:  CARD_BOTH_REORDER,
    payload: cardorder
})


// Define Thunks
export const card_reorder_both_thunk = (source_listid, destination_listid, card_moved, new_source_list_array, new_destination_list_array, destinationindex) => async (dispatch) => {
    const response = await fetch(`/api/list/change-card-order-both`, {
        method: ['PUT'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
                                   'source_listid': source_listid,
                                   'destination_listid': destination_listid,
                                   'card_moved': card_moved,
                                   'new_source_list_array': new_source_list_array,
                                   'new_destination_list_array': new_destination_list_array,
                                   'destinationindex': destinationindex
                                    })
        })


    if(response.ok) {
        const neworder = await response.json();
        dispatch(card_reorder_both(neworder));
        return true
    } else{
        return false
    }


}

export const card_reorder_same_list_thunk = (newcardorder, liststringid) => async (dispatch) => {
    const response = await fetch(`/api/list/change-card-order/${liststringid}`, {
        method: ['PUT'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
                                   'newcardorder': newcardorder
                                    })
        })


    if(response.ok) {
        const neworder = await response.json();
        dispatch(card_reorder(neworder));
        return true
    } else{
        return false
    }
}

export const get_card_data = (listid) => async (dispatch) => {
    const response = await fetch(`/api/list/${listid}`)

    if(response.ok) {
        const card_data = await response.json();
        dispatch(getcarddata(card_data));
        // console.log(card_data);
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
        case CARD_REORDER:
            let card_same_list_reorder = {...state}
            card_same_list_reorder[action.payload['listid']] = action.payload
            return card_same_list_reorder
        case CARD_BOTH_REORDER:
            let card_both_list_reorder = {...state};
            card_both_list_reorder[action.payload['sourcelist']['listid']] = action.payload['sourcelist'];
            card_both_list_reorder[action.payload['destinationlist']['listid']] = action.payload['destinationlist'];
            return card_both_list_reorder
            // case DELETE_LIST:
        //     let afterDeleteState = {...state}
        //     afterDeleteState['board']['list_order'] = action.payload['list_order']
        //     afterDeleteState['board']['lists_in_board'] = action.payload['lists_in_board']
        //     return afterDeleteState

        default:
            return state;
    };
};
