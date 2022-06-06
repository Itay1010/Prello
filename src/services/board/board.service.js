import { httpService } from '../basic/http.service'
import getAverageColor from 'get-average-color'

const BASE_URL = (process.env.NODE_ENV === 'production')
    ? '/api/board'
    : 'http://localhost:3030/api/board/'

export const boardService = {
    query,
    getById,
    remove,
    save,
    getTask,
    getMembers,
    getLabels,
    calcAvgColor,
    // updateMini
}

async function query() {
    return httpService.get('board')
}

async function getById(boardId) {
    return await httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}

async function save(board) {
    if (board._id) return httpService.put(`board/${board._id}`, board)
    else return httpService.post('board', board)
}

async function getTask(boardId, groupId, taskId) {
    const board = await getById(boardId)
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    return task
}

function getLabels() {
    return ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf']
}

async function getMembers(boardId) {
    const board = await getById(boardId)
    return board.members
}

async function calcAvgColor(url) {
    const RGB = await getAverageColor(url)
    const HEX = _rgbToHex(RGB)
    return HEX
}

function _rgbToHex({ r, g, b }) {
    return '#' + _componentToHex(r) + _componentToHex(g) + _componentToHex(b);
}

function _componentToHex(cmp) {
    const hex = cmp.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}


function _lightOrDark(color) {
    const r = color[1]
    const g = color[2]
    const b = color[3]

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    )

    // Using the HSP value, determine whether the color is light or dark
    // if (hsp > 127.5) console.log('light')
    // else console.log('dark')
}




// const STORAGE_KEY = 'board'
// // const boardChannel = new BroadcastChannel('boardChannel')

// //  (() => {
// //     boardChannel.addEventListener('message', (ev) => {
// //         store.dispatch(ev.data)
// //     })
// //     socketService.on(SOCKET_EVENT_board_ADDED, (board) => {
// //         console.log('GOT from socket', board)
// //         store.dispatch(getActionAddboard(board))
// //     })
// //     socketService.on(SOCKET_EVENT_board_ABOUT_YOU, (board) => {
// //         showSuccessMsg(`New board about me ${board.txt}`)
// //     })
// // })()


// const _logError = (err) => {
//     return err
// }


// function _getEmptyBoard() {
//     return emptyBoard
// }


// // storageService.post(STORAGE_KEY, jsonBoard)