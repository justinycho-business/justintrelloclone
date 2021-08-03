import { bodyOpenClassName } from "react-modal/lib/components/Modal";


// Define action types
const GET_BOARDS = 'board/GET_BOARDS';

const DELETE_LIST = 'board/DELETE_LIST';

const DELETE_BOARD = 'board/DELETE_BOARD';

const CREATE_LIST = 'board/CREATE_LIST';

const CREATE_BOARD = 'board/CREATE_BOARD';

const LIST_CHANGE_NAME = 'board/LIST_CHANGE_NAME'

const BOARD_CHANGE_NAME = 'board/BOARD_CHANGE_NAME'

// Action Creators
const getboardData = (userboards) => ({
    type: GET_BOARDS,
    payload: userboards
})

const dltList = (list) => ({
    type: DELETE_LIST,
    payload: list
})

const dltBoard = (board) => ({
    type: DELETE_BOARD,
    payload: board
})

const crtList = (list) => ({
    type: CREATE_LIST,
    payload: list
})

const crtBoard = (board) => ({
    type: CREATE_BOARD,
    payload: board
})

const list_name_change = (list) => ({
    type: LIST_CHANGE_NAME,
    payload: list
})

const board_name_change = (board) => ({
    type: BOARD_CHANGE_NAME,
    payload: board
})

// Define Thunks
export const getUserBoardData = (boardid) => async (dispatch) => {
    const response = await fetch(`/api/board/${boardid}`)

    if(response.ok) {
        const boardData = await response.json();
        dispatch(getboardData(boardData));
    }
}

export const delete_list_thunk = (listid, stringboardid) => async (dispatch) => {
    const response = await fetch(`/api/board/delete-list/${listid}`, {
        method: ['DELETE'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({ 'listid':listid,  'boardid': stringboardid})
    })

    if(response.ok) {
        const listmsg = await response.json();
        dispatch(dltList(listmsg));
    }
}

export const delete_board_thunk = (stringboardid) => async (dispatch) => {
    const response = await fetch(`/api/board/delete-board/${stringboardid}`, {
        method: ['DELETE'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({'boardid': stringboardid})
    })

    if(response.ok) {
        const deleteboard = await response.json();
        dispatch(dltBoard(deleteboard));
    }
}

export const create_list_thunk = (boardid) => async (dispatch) => {
    const response = await fetch(`/api/board/create-list/${boardid}`, {
        method: ['POST'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           }

        })


    if(response.ok) {
        const newlist = await response.json();
        dispatch(crtList(newlist));
    }
}

export const create_board_thunk = (userid) => async (dispatch) => {
    const response = await fetch(`/api/board/create-board/${userid}`, {
        method: ['POST'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           }

        })


    if(response.ok) {
        const newboard = await response.json();
        dispatch(crtBoard(newboard));
    }
}

export const change_list_name_thunk = (listid, listname, board_id) => async (dispatch) => {
    const response = await fetch(`/api/board/changename-list/${listid}`, {
        method: ['PUT'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({ 'listid':listid,
                                   'listname': listname,
                                    'boardid': board_id})
        })


    if(response.ok) {
        const newlist = await response.json();
        dispatch(list_name_change(newlist));
    }
}

export const change_board_name_thunk = (boardid, boardname, userid) => async (dispatch) => {
    const response = await fetch(`/api/board/changename-board/${boardid}`, {
        method: ['PUT'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({ 'boardid':boardid,
                                   'boardname': boardname,
                                    'userid': userid})
        })


    if(response.ok) {
        const newboard = await response.json();
        dispatch(board_name_change(newboard));
    }
}
// export const addFundsToPortfolio = (payload) => async (dispatch) => {
//     const response = await fetch('/api/dashboard/addFunds', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(payload)
//     });

//     if (response.ok) {
//         const updatedPortfolio = await response.json()
//         dispatch(addFunds(updatedPortfolio));
//     }
// };

// export const graphTimePeriodButton = (payload_obj) => async(dispatch) => {
//     const response = await fetch('/api/dashboard/timePeriod', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(payload_obj)
//     });

//     if(response.ok) {
//         const updatedGraphData = await response.json()
//         dispatch(timePeriodButton(updatedGraphData))
//     }
// }


// Define initial state
const initialState = {}

  // Define reducer
export default function boardReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BOARDS:
            return {...state, board: action.payload }
        case DELETE_LIST:
            // return {...state, delete_list_msg: action.payload }
            let afterDeleteState = {...state}
            afterDeleteState['board']['lists_in_board'] = action.payload
            return afterDeleteState
        case CREATE_LIST:
            let afterCreateState = {...state}
            afterCreateState['board']['lists_in_board'] = action.payload
            return  afterCreateState
        case LIST_CHANGE_NAME:
            let afterChangeListNameState = {...state}
            afterChangeListNameState['board']['lists_in_board'] = action.payload
            return  afterChangeListNameState
        case BOARD_CHANGE_NAME:
            let afterChangeBoardNameState = {...state}
            afterChangeBoardNameState['board']['board_details'] = action.payload
            return  afterChangeBoardNameState
        case DELETE_BOARD:
            let afterDeleteBoardNameState = {...state}
            afterDeleteBoardNameState['board'] = action.payload
            return  afterDeleteBoardNameState
        case CREATE_BOARD:
                let afterCreateBoardNameState = {...state}
                afterCreateBoardNameState['board'] = action.payload
                return  afterCreateBoardNameState
            // case ADD_FUNDS:
        //     return {...state, amount: action.payload }
        // case DASHBOARD_DATA:
        //     return {...state, userData: action.payload}
        // case TIME_PERIOD_BUTTON:
        //     return {...state, graphButtonData: [action.payload]}
        default:
            return state;
    };
};
