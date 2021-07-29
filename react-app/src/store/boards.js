

// Define action types
const GET_BOARDS = 'board/GET_BOARDS';

// Action Creators
const getboardData = (userboards) => ({
    type: GET_BOARDS,
    payload: userboards
})

// Define Thunks
export const getUserBoardData = (boardid) => async (dispatch) => {
    const response = await fetch(`/api/board/${boardid}`)

    if(response.ok) {
        const boardData = await response.json();
        dispatch(getboardData(boardData));
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
            return {...state, amount: action.payload }
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
