// import { showSuccessMsg } from '../services/event-bus.service'
import { boardService } from '../../services/board/board.service'
// import { userService } from '../../services/user.service'

// Action Creators
export function getActionRemoveBoard(boardId) {
    return { type: 'REMOVE_BOARD', boardId }
}

export function getActionAddBoard(board) {
    return { type: 'ADD_BOARD', board }
}

export function loadBoard() {
    return async dispatch => {
        try {
            const board = await boardService.query()
            dispatch({ type: 'SET_BOARDS', board })

        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }
}

export function addBoard(board) {
    return async dispatch => {
        try {
            const addedBoard = await boardService.add(board)
            dispatch(getActionAddBoard(addedBoard))

            // Change the score in user kept in sessionStorage
            // userService.saveLocalUser(addedBoard.byUser)
            const { score } = addedBoard.byUser
            // const score = await userService.changeScore(SCORE_FOR_REVIEW)
            dispatch({ type: 'SET_SCORE', score })

        } catch (err) {
            console.log('BoardActions: err in addBoard', err)
            throw err
        }
    }
}

export function removeBoard(boardId) {
    return async dispatch => {
        try {
            await boardService.remove(boardId)
            dispatch(getActionRemoveBoard(boardId))
        } catch (err) {
            console.log('BoardActions: err in removeBoard', err)
            throw err
        }
    }
}
