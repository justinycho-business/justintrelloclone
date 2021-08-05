import { bodyOpenClassName } from "react-modal/lib/components/Modal";


// Define action types
const GET_HOME_BOARDS = 'board/GET_HOME_BOARDS'

const GET_BOARDS = 'board/GET_BOARDS';

const DELETE_LIST = 'board/DELETE_LIST';

const LIST_REORDER = 'board/LIST_REORDER';

const DELETE_BOARD = 'board/DELETE_BOARD';

const CREATE_LIST = 'board/CREATE_LIST';

const CREATE_BOARD = 'board/CREATE_BOARD';

const LIST_CHANGE_NAME = 'board/LIST_CHANGE_NAME'

const BOARD_CHANGE_NAME = 'board/BOARD_CHANGE_NAME'

// Action Creators
const getHomeBoards = (userboards) => ({
    type: GET_HOME_BOARDS,
    payload: userboards
})

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

const list_reorder = (order) => ({
    type: LIST_REORDER,
    payload: order
})

// Define Thunks
export const getHomeBoardData = (userid) => async (dispatch) => {
    const response = await fetch(`/api/board/user/${userid}`)

    if(response.ok) {
        const boardData = await response.json();
        dispatch(getHomeBoards(boardData));
        return true
    } else{
        return false
    }
}

export const getUserBoardData = (boardid) => async (dispatch) => {
    const response = await fetch(`/api/board/${boardid}`)

    if(response.ok) {
        const boardData = await response.json();
        dispatch(getboardData(boardData));
        return true
    } else{
        return false
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
        return true
    } else{
        return false
    }
}

export const delete_board_thunk = (stringboardid, history) => async (dispatch) => {
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
        history.push(`/`)
        return true
    } else{
        return false
    }
}

export const create_list_thunk = (boardid, listlength) => async (dispatch) => {
    const response = await fetch(`/api/board/create-list/${boardid}`, {
        method: ['POST'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({ 'listlength': listlength
                                   })

        })


    if(response.ok) {
        const newlist = await response.json();
        dispatch(crtList(newlist));
        return true
    } else{
        return false
    }

}

export const create_board_thunk = (userid, history) => async (dispatch) => {
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
        console.log(newboard);
        history.push(`/board/${newboard['board_details']['id']}`)
        return true
    } else{
        return false
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
        return true
    } else{
        return false
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
        return true
    } else{
        return false
    }
}

export const list_reorder_thunk = (order, boardid) => async (dispatch) => {
    const response = await fetch(`/api/board/change-list-order/${boardid}`, {
        method: ['PUT'],
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
           },
           body: JSON.stringify({ 'boardid': boardid,
                                   'listorder': order,
                                    })
        })


    if(response.ok) {
        const neworder = await response.json();
        dispatch(list_reorder(neworder));
        return true
    } else{
        return false
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
        case GET_HOME_BOARDS:
            return {...state, userboards: action.payload }
        case DELETE_LIST:
            // return {...state, delete_list_msg: action.payload }
            let afterDeleteState = {...state}
            afterDeleteState['board']['list_order'] = action.payload['list_order']
            afterDeleteState['board']['lists_in_board'] = action.payload['lists_in_board']
            return afterDeleteState

            afterDeleteState['board']['lists_in_board'] = action.payload
            return afterDeleteState
        case CREATE_LIST:
            let afterCreateState = {...state}
            afterCreateState['board']['list_order'] = action.payload['list_order']
            afterCreateState['board']['lists_in_board'] = action.payload['lists_in_board']
            return  afterCreateState
        case LIST_CHANGE_NAME:
            let afterChangeListNameState = {...state}
            afterChangeListNameState['board']['list_order'] = action.payload['list_order']
            afterChangeListNameState['board']['lists_in_board'] = action.payload['lists_in_board']
            return afterChangeListNameState
        case BOARD_CHANGE_NAME:
            let afterChangeBoardNameState = {...state}
            afterChangeBoardNameState['board']['board_details'] = action.payload
            return  afterChangeBoardNameState
        case DELETE_BOARD:
            let afterDeleteBoardNameState = {...state}
            afterDeleteBoardNameState['userboards']['userboards'] = action.payload["userboards"]
            afterDeleteBoardNameState['board'] = action.payload
            return  afterDeleteBoardNameState
        case CREATE_BOARD:
            let afterCreateBoardNameState = {...state}
            afterCreateBoardNameState['board'] = action.payload
            return  afterCreateBoardNameState
        case LIST_REORDER:
            let afterNewOrderState = {...state}
            afterNewOrderState['board']['list_order'] = action.payload['list_order']
            return afterNewOrderState

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
