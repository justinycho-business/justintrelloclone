import { bodyOpenClassName } from "react-modal/lib/components/Modal";

// Define action types
const GET_CHECKLISTS = 'cards/GET_CHECKLISTS';

const CREATE_CHECKLISTS = 'cards/CREATE_CHECKLISTS';

const RENAME_CHECKLIST = 'cards/RENAME_CHECKLIST';

const DELETE_CHECKLIST = 'cards/DELETE_CHECKLIST';

// Action Creators
const getchecklistdata = (checklistdata) => ({
    type:  GET_CHECKLISTS,
    payload: checklistdata
})

const create_checklist = (checklistdata) => ({
    type:  CREATE_CHECKLISTS,
    payload: checklistdata
})

const change_checklist_name = (checklistdata) => ({
    type:  RENAME_CHECKLIST,
    payload: checklistdata
})

const delete_checklist = (checklistdata) => ({
    type:  DELETE_CHECKLIST,
    payload: checklistdata
})

// Define Thunks
export const get_checklists_for_card = (cardid) => async (dispatch) => {
    const response = await fetch(`/api/card/${cardid}`)

    if(response.ok) {
        const checklist_data = await response.json();
        dispatch(getchecklistdata(checklist_data));
        // console.log(card_data);
    }
}

export const create_checklist_thunk = (cardid) => async (dispatch) => {
    const response = await fetch(`/api/card/create-checklist/${cardid}`, {
        method: ['POST'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({ 'cardid': cardid
                                   })

    })

    if(response.ok) {
        const checklist_data = await response.json();
        dispatch(create_checklist(checklist_data));
        // console.log(card_data);
    }
}

export const change_checklist_name_thunk = (checklistid, checklistname, cardid) => async (dispatch) => {
    const response = await fetch(`/api/card/change-name-checklist/${checklistid}`, {
        method: ['PUT'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'checklistid': checklistid,
            'checklistname': checklistname,
            'cardid': cardid
                                   })
    })

    if(response.ok) {
        const card_data = await response.json();
        dispatch(change_checklist_name(card_data));
    }
}

export const delete_checklist_thunk = (checklistid, cardid) => async (dispatch) => {
    const response = await fetch(`/api/card/delete-checklist/${checklistid}`, {
        method: ['DELETE'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'cardid': cardid
                                   })

    })

    if(response.ok) {
        const card_data = await response.json();
        dispatch(delete_checklist(card_data));

    }
}

// Define initial state
const initialState = {}

  // Define reducer
export default function cardReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHECKLISTS:
            let getChecklistsState = {...state}
            getChecklistsState[action.payload['cardid']] = action.payload
            return getChecklistsState
        case CREATE_CHECKLISTS:
            let createChecklistState = {...state}
            createChecklistState[action.payload['cardid']] = action.payload
            return createChecklistState
        case RENAME_CHECKLIST:
            let renameChecklistState = {...state}
            renameChecklistState[action.payload['cardid']] = action.payload
            return renameChecklistState
        case DELETE_CHECKLIST:
            let deleteChecklistState = {...state}
            deleteChecklistState[action.payload['cardid']] = action.payload
            return deleteChecklistState
        default:
            return state;
    };
};
