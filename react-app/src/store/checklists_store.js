import { bodyOpenClassName } from "react-modal/lib/components/Modal";

// Define action types
const GET_BULLETS = 'checklist/GET_BULLETS';

const CREATE_BULLETS = 'checklist/CREATE_BULLETS';

const CHANGE_CONTENT = 'checklist/CHANGE_CONTENT';

const DELETE_BULLET = 'checklist/DELETE_BULLET';
// Action Creators
const getbulletdata = (bulletdata) => ({
    type:  GET_BULLETS,
    payload: bulletdata
})

const createbulletdata = (bulletdata) => ({
    type:  CREATE_BULLETS,
    payload: bulletdata
})

const change_bullet_content = (bulletdata) => ({
    type:  CHANGE_CONTENT,
    payload: bulletdata
})

const delete_bullet  = (bulletdata) => ({
    type:  DELETE_BULLET,
    payload: bulletdata
})

// Define Thunks
export const get_bullets_for_checklist = (checklistid) => async (dispatch) => {
    const response = await fetch(`/api/checklist/${checklistid}`)

    if(response.ok) {
        const bullet_data = await response.json();
        dispatch(getbulletdata(bullet_data));
        const second_bullet_data = await bullet_data
        let hi = bullet_data.bulletdict
        let hi5 = Object.values(hi)
        return hi
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

export const change_bullet_content_thunk = (bulletid, bulletcontent, checklistid) => async (dispatch) => {
    const response = await fetch(`/api/checklist/change-content-bullet/${bulletid}`, {
        method: ['PUT'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'bulletid': bulletid,
            'bulletcontent': bulletcontent,
            'checklistid': checklistid
                                   })
    })

    if(response.ok) {
        const bullet_data = await response.json();
        dispatch(change_bullet_content(bullet_data));
    }
}

export const delete_bullet_thunk = (bulletid, checklistid) => async (dispatch) => {
    const response = await fetch(`/api/checklist/delete-bullet/${bulletid}`, {
        method: ['DELETE'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({
            'checklistid': checklistid
                                   })

    })

    if(response.ok) {
        const bullet_data = await response.json();
        dispatch(delete_bullet(bullet_data));

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
        case CHANGE_CONTENT:
            let changeBulletContent = {...state}
            changeBulletContent[action.payload['checklistid']] = action.payload
            return changeBulletContent
        case DELETE_BULLET:
            let deleteBullet = {...state}
            deleteBullet[action.payload['checklistid']] = action.payload
            return deleteBullet

        default:
            return state;
    };
};
