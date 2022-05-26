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

export function loadBoardMinis() {
    return async dispatch => {
        try {
            const minis = await boardService.query()
            // const minis = await boardService.query({ minis: true })
            dispatch({ type: 'SET_BOARDS', minis })
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }
}

export function addBoard(board) {
    return async dispatch => {
        try {
            let savedBoard = await boardService.save(board)
            savedBoard = boardService.minify(savedBoard)
            dispatch(getActionAddBoard(savedBoard))
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
