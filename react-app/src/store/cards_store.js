import { bodyOpenClassName } from "react-modal/lib/components/Modal";

// Define action types
const GET_CHECKLISTS = 'cards/GET_CHECKLISTS';

// Action Creators
const getchecklistdata = (checklistdata) => ({
    type:  GET_CHECKLISTS,
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

// Define initial state
const initialState = {}

  // Define reducer
export default function cardReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHECKLISTS:
            let getChecklistsState = {...state}
            getChecklistsState[action.payload['cardid']] = action.payload
            return getChecklistsState

        default:
            return state;
    };
};
