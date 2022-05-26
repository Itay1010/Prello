import { store } from '../../store/root.reducer'
import { utilService } from '../../services/basic/util.service'
import { getActionSetBoard } from '../../store/board/board.action'
import { storageService } from '../basic/async-storage.service'
import { boardService } from './board.service'

export const groupService = {
    archiveGroup,
    groupChange,
    getGroupById,
    editChecklist
}

async function archiveGroup(groupId) {

    let { boardModule: { selectedBoard: board } } = store.getState()
    board = { ...board }
    const newBoard = { ...board }
    newBoard.groups.map(group => {
        if (group.id === groupId) group.archivedAt = Date.now()
    })
    try {
        store.dispatch(getActionSetBoard(newBoard))
        await boardService.save(newBoard)
    } catch (error) {
        store.dispatch(getActionSetBoard(board))
        console.error('Had en error setting board', error)
    }
    this._loadBoard()
}


async function groupChange({ txt, groupId }) {

    let { boardModule: { selectedBoard: board } } = store.getState()
    board = { ...board }
    const newBoard = { ...board }
    newBoard.groups.map(group => {
        if (group.id === groupId) group.title = txt
    })

    try {
        store.dispatch(getActionSetBoard(newBoard))
        await storageService.put(newBoard)
    } catch (error) {
        store.dispatch(getActionSetBoard(board))
        console.error('Had en error setting board', error)
    }
}

async function editChecklist(updatedGroup, groupId) {
    // console.log('updatedGroup', updatedGroup);
    // console.log('groupId', groupId);
    let { boardModule: { selectedBoard: board } } = store.getState()
    board = { ...board }
    const newBoard = { ...board }
    newBoard.groups.map(group => {
        if (group.id === groupId) group = updatedGroup
    })

    try {
        store.dispatch(getActionSetBoard(newBoard))
        await storageService.put(newBoard)
        console.log('trying in the service')
    } catch (error) {
        store.dispatch(getActionSetBoard(board))
        console.error('Had en error setting board', error)
    }
}


async function getGroupById(groupId, boardId) {
    const board = await boardService.getById(boardId)
    return board.groups.find(group => group.id === groupId)



}