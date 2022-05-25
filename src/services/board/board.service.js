import { utilService } from './util.service.js'
import { storageService } from '../basic/async-storage.service'
import { httpService } from '../basic/http.service'
import {  getActionAddBoard, getActionRemoveBoard } from '../../store/board/board.action'

// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'
// import { showSuccessMsg } from '../services/event-bus.service'

const STORAGE_KEY = 'board'
// const boardChannel = new BroadcastChannel('boardChannel')

// ; (() => {
//     boardChannel.addEventListener('message', (ev) => {
//         store.dispatch(ev.data)
//     })
//     socketService.on(SOCKET_EVENT_board_ADDED, (board) => {
//         console.log('GOT from socket', board)
//         store.dispatch(getActionAddboard(board))
//     })
//     socketService.on(SOCKET_EVENT_board_ABOUT_YOU, (board) => {
//         showSuccessMsg(`New board about me ${board.txt}`)
//     })
// })()

export const boardService = {
    add,
    query,
    remove,
    getById,
    save
    // subscribe,
    // unsubscribe,
}


function query(filterBy) {
    var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    // return httpService.get(`board${queryStr}`)
    return storageService.query(STORAGE_KEY)
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
    // return axios.get(`/api/board/${boardId}`)
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
    // await httpService.delete(`review/${reviewId}`)
    // await storageService.remove('review', reviewId)
    // reviewChannel.postMessage(getActionRemoveReview(reviewId))
}



async function add(board) {
    const addedBoard = await httpService.post(`review`, board)
    return addedBoard
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
        // boardChannel.postMessage(getActionUpdateBoard(savedBoard))

    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
        // boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}


function getEmptyBoard() {
}

// ;(async ()=>{
    //     await userService.create({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
    //     await userService.create({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
    //     await userService.create({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
    // })()
// }





