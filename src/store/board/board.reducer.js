const initialState = {
    miniBoards: []
}

export function boardReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_BOARDS':
            return { ...state, miniBoards: action.miniBoards }
        case 'ADD_BOARD':
            return { ...state, miniBoards: [action.miniBoards, ...state.miniBoards] }
        case 'REMOVE_BOARD':
            return { ...state, miniBoards: state.miniBoards.filter(board => board._id !== action.boardId) }
        case 'UPDATE_BOARD':
            return {
                ...state,
                boards: state.boards.map(board =>
                    board._id === action.board._id ? action.board : board
                )
            }
        default:
            return state
    }
}
