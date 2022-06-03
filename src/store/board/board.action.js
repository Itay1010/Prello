
import { boardService } from '../../services/board/board.service'
import { minisService } from '../../services/board/minis.service'

// Board Action Creators
function getActionSetBoard(board) {
    return { type: 'SET_BOARD', board }
}

function getActionRemoveBoard(boardId) {
    return { type: 'CLEAR_BOARD', boardId }
}

//Minis Action Creators
function getActionSetMinis(minis) {
    return { type: 'SET_MINIS', minis }
}
function getActionAddMini(mini) {

    return { type: 'ADD_MINI', mini }
}
function getActionRemoveMini(mini) {
    return { type: 'REMOVE_MINI', mini }
}
function getActionUpdateMini(mini) {
    return { type: 'UPDATE_MINI', mini }
}

//load minis to state
export function loadBoardMinis() {
    return async dispatch => {
        try {
            const minis = await boardService.query()
            dispatch(getActionSetMinis(minis))
            return minis
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }
}

//load board to state
export function loadBoard(boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId)
            dispatch(getActionSetBoard(board))
            return board
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
            throw err
        }
    }
}

export function addBoard(board) {
    return async dispatch => {
        try {
            const addedBoard = await boardService.save(board)
            return addedBoard
        }
        catch {
        }
    }
}

export function updateMini(board) {
    return async dispatch => {
        const newMini = minisService.saveMiniBoard(board)
        dispatch(getActionUpdateMini(newMini))
    }
}

export function updateBoard(newBoard) {
    return async (dispatch, getState) => {
        const prevBoard = { ...getState().boardModule.board }
        try {
            dispatch(getActionSetBoard(newBoard))
            await boardService.save(newBoard)
        } catch (error) {
            dispatch(getActionSetBoard(prevBoard))
            console.error('Had en error setting board', error)
        }
    }
}

export function clearBoard() {
    return (dispatch, getState) => {
        dispatch(getActionSetBoard(null))
    }
}
