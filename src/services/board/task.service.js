import { store } from '../../store/root.reducer'
import { utilService } from '../../services/basic/util.service'
import { getActionSetBoard } from '../../store/board/board.action'
import { boardService } from './board.service'

export const taskService = {
    addTask,
    archiveTask
}


async function addTask(newTask) {
    let { boardModule: { selectedBoard: board } } = store.getState()
    board = { ...board }
    const newBoard = { ...board }
    const groupIdx = board.groups.findIndex(group => group.id === newTask.groupId)

    newTask = { id: utilService.makeId(), title: newTask.title }
    newBoard.groups[groupIdx].tasks.push(newTask)
    try {
        store.dispatch(getActionSetBoard(newBoard))
        await boardService.save(newBoard)
    } catch (error) {
        store.dispatch(getActionSetBoard(board))
        console.error('Had en error setting board', error)
    }
}

async function archiveTask({ taskId, groupId }) {
    let { boardModule: { selectedBoard: board } } = store.getState()
    board = { ...board }
    const newBoard = { ...board }
    const groupIdx = board.groups.findIndex(group => group.id === groupId)

    newBoard.groups[groupIdx].tasks.map(task => {
        if (task.id === taskId) task.archivedAt = Date.now()
    })
    try {
        store.dispatch(getActionSetBoard(newBoard))
        await boardService.save(newBoard)
    } catch (error) {
        store.dispatch(getActionSetBoard(board))
        console.error('Had en error setting board', error)
    }
}