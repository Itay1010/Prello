const initialState = {
    miniBoards: [],
    selectedBoard: null
}

export function boardReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_MINIS':
            return { ...state, miniBoards: action.miniBoards }
        case 'ADD_MINI':
            return { ...state, miniBoards: [action.miniBoards, ...state.miniBoards] }
        case 'REMOVE_MINI':
            return { ...state, miniBoards: state.miniBoards.filter(mini => mini._id !== action.boardId) }
        case 'UPDATE_MINI':
            return {
                ...state,
                miniBoards: state.miniBoards.map(mini =>
                    mini._id === action.mini._id ? action.mini : mini
                )
            }
        case 'SET_BOARD':
            return { ...state, selectedBoard: action.board }
        case 'CLEAR_BOARD':
            return { ...state, selectedBoard: null }
        default:
            return state
    }
}
