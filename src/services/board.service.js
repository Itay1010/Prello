import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'
// import { getActionRemoveReview, getActionAddReview } from '../store/.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'

const reviewChannel = new BroadcastChannel('reviewChannel')

// ; (() => {
//     reviewChannel.addEventListener('message', (ev) => {
//         store.dispatch(ev.data)
//     })
//     socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
//         console.log('GOT from socket', review)
//         store.dispatch(getActionAddReview(review))
//     })
//     socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
//         showSuccessMsg(`New review about me ${review.txt}`)
//     })
// })()

export const reviewService = {
    add,
    query,
    remove,
    // subscribe,
    // unsubscribe,
    getById,
}


// function query(filterBy) {
//     var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
//     return httpService.get(`review${queryStr}`)
//     // return storageService.query('review')
// }

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
    // return axios.get(`/api/board/${boardId}`)
}


async function remove(reviewId) {
    // await httpService.delete(`review/${reviewId}`)
    await storageService.remove(STORAGE_KEY, boardId)
    // await storageService.remove('review', reviewId)
    // reviewChannel.postMessage(getActionRemoveReview(reviewId))
}



async function add(review) {
    const addedReview = await httpService.post(`review`, review)

    return addedReview
}



import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveBoard, getActionAddBoard, getActionUpdateBoard } from '../store/board.actions.js'

const STORAGE_KEY = 'board'
const boardChannel = new BroadcastChannel('boardChannel')
// const listeners = []

export const boardService = {
    query,
    save,
    remove,
    getEmptyBoard,
    subscribe,
    unsubscribe

}
window.cs = boardService;


function query() {
    return storageService.query(STORAGE_KEY)
}
function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
    // return axios.get(`/api/board/${boardId}`)
}
async function remove(boardId) {

    await storageService.remove(STORAGE_KEY, boardId)
    boardChannel.postMessage(getActionRemoveBoard(boardId))
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
        boardChannel.postMessage(getActionUpdateBoard(savedBoard))

    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
        boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}


function getEmptyBoard() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

// function subscribe(listener) {
//     boardChannel.addEventListener('message', listener)
// }
// function unsubscribe(listener) {
//     boardChannel.removeEventListener('message', listener)
// }


// ;(async ()=>{
    //     await userService.create({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
    //     await userService.create({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
    //     await userService.create({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
    // })()
// }





