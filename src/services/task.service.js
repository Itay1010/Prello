// import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'
// import { getActionRemoveBoard, getActionAddBoard } from '../store/board.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
// const boardChannel = new BroadcastChannel('boardChannel')

// ; (() => {
//     boardChannel.addEventListener('message', (ev) => {
//         store.dispatch(ev.data)
//     })
//     socketService.on(SOCKET_EVENT_REVIEW_ADDED, (board) => {
//         console.log('GOT from socket', board)
//         store.dispatch(getActionAddBoard(board))
//     })
//     socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (board) => {
//         showSuccessMsg(`New board about me ${board.txt}`)
//     })
// })()

export const boardService = {
    add,
    query,
    remove,
    getById
    // subscribe,
    // unsubscribe,
}


function query(filterBy) {
    // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    // return httpService.get(`board${queryStr}`)
    return storageService.query(STORAGE_KEY)
    // return storageService.query('board')
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // await httpService.delete(`board/${boardId}`)
    await storageService.remove('board', boardId)
    // boardChannel.postMessage(getActionRemoveBoard(boardId))
}

async function add(board) {
    const addedBoard = await storageService.post('board', board)

    boardChannel.postMessage(getActionAddBoard(addedBoard))

    return addedBoard
    // const addedBoard = await httpService.post(`board`, board)

    // board.byUser = userService.getLoggedinUser()
    // board.aboutUser = await userService.getById(board.aboutUserId)
}

// function subscribe(listener) {
//     boardChannel.addEventListener('message', listener)
// }
// function unsubscribe(listener) {
//     boardChannel.removeEventListener('message', listener)
// }
