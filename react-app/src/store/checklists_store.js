import { bodyOpenClassName } from "react-modal/lib/components/Modal";

// Define action types
const GET_BULLETS = 'cards/GET_BULLETS';

const CREATE_BULLETS = 'cards/CREATE_BULLETS';
// Action Creators
const getbulletdata = (bulletdata) => ({
    type:  GET_BULLETS,
    payload: bulletdata
})

const createbulletdata = (bulletdata) => ({
    type:  CREATE_BULLETS,
    payload: bulletdata
})

// Define Thunks
export const get_bullets_for_checklist = (checklistid) => async (dispatch) => {
    const response = await fetch(`/api/checklist/${checklistid}`)

    if(response.ok) {
        const bullet_data = await response.json();
        dispatch(getbulletdata(bullet_data));
    }
}

export const create_bullet_thunk = (checklistid) => async (dispatch) => {
    const response = await fetch(`/api/checklist/create-bullet/${checklistid}`, {
        method: ['POST'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({ 'checklistid': checklistid
                                   })

    })

    if(response.ok) {
        const bullet_data = await response.json();
        dispatch(createbulletdata(bullet_data));
    }
}
// Define initial state
const initialState = {}

  // Define reducer
export default function checklistReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BULLETS:
            let getBulletState = {...state}
            getBulletState[action.payload['checklistid']] = action.payload
            return getBulletState
        case CREATE_BULLETS:
            let createBulletState = {...state}
            createBulletState[action.payload['checklistid']] = action.payload
            return createBulletState
        default:
            return state;
    };
};
