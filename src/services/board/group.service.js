import { store } from '../../store/root.reducer'
import { utilService } from '../../services/basic/util.service'
import { getActionSetBoard } from '../../store/board/board.action'
import { storageService } from '../basic/async-storage.service'
import { boardService } from './board.service'

export const groupService = {
    archiveGroup,
    groupChange
}

async function archiveGroup(groupId) {

    let { boardModule: { selectedBoard: board } } = store.getState()
    console.log('archiveGroup - board', board)
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