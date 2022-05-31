// import Axios from 'axios'

// var axios = Axios.create({
//     withCredentials: true
// })


// const BASE_URL = (process.env.NODE_ENV === 'production')
//     ? '/api/board'
//     : 'http://localhost:3000/api/board/'

import { httpService } from '../basic/http.service'
import getAverageColor from 'get-average-color'



export const boardService = {
    query,
    getById,
    remove,
    save,
    getTask,
    getMembers,
    getLabels,
    getAvgColor
}

async function query() {
    return httpService.get()
    // try {
    //     const res = await axios.get(BASE_URL, { params: filterBy })
    //     return res.data
    // } catch (err) {
    //     console.log('Failed to get data \n', err)
    //     throw err
    // }
}

// async function getById(boardId) {
async function getById(boardId) {
    // console.log(boardId);
    return await httpService.get(`board/${boardId}`)
    // try {
    //     const res = await axios.get(BASE_URL + boardId)
    //     return res.data
    // } catch (err) {
    //     console.log('Board was not found \n', err)
    //     throw err
    // }
}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
    // try {
    //     const res = await axios.delete(BASE_URL + boardId)
    //     return res.data
    // } catch (err) {
    //     console.log('Remove board failed \n', err)
    //     throw err
    // }
}

async function save(board) {
    if (board._id) {
        return httpService.put(`board/${board._id}`, board)

        // try {
        //     const res = await axios.put(BASE_URL + board._id, board)
        //     return res.data
        // } catch (err) {
        //     console.log('Saving board failed \n', err)
        //     throw err
        // }
    } else {
        return httpService.post('board', board)

        // try {
        //     const res = await axios.post(BASE_URL, board)
        //     return res.data
        // } catch (err) {
        //     console.log('Saving new board failed \n', err)
        //     throw err
        // }
    }
}

async function getTask(boardId, groupId, taskId) {
    const board = await getById(boardId)
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    return task
}

async function getMembers(boardId) {
    const board = await getById(boardId)
    return board.members
}

function getLabels() {
    return ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf']
}

async function getAvgColor(url) {
    const RGB = await getAverageColor(url)
    _lightOrDark(RGB)
    const HEX = _rgbToHex(RGB)
    // _lightOrDark(HEX)
    return HEX
}

function _rgbToHex({ r, g, b }) {
    return "#" + _componentToHex(r) + _componentToHex(g) + _componentToHex(b);
}

function _componentToHex(cmp) {
    const hex = cmp.toString(16)
    return hex.length === 1 ? "0" + hex : hex
}


function _lightOrDark(color) {
    // console.log(color);

    // Variables for red, green, blue values
    var { r, g, b } = color
    var hsp

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));
        console.log(color);
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {

        return 'light';
    }
    else {

        return 'dark';
    }
}











// import { utilService } from '../../services/basic/util.service'
// import { storageService } from '../basic/async-storage.service'
// // import { httpService } from '../basic/http.service'
// import { getActionSetBoard, getActionRemoveBoard } from '../../store/board/board.action'
// import { userService } from "../../services/user.service"
// import { useState } from 'react'
// const emptyBoard = require('../../data/empty-board.json')
// const jsonBoard = require('../../data/prello-boards-demo.json')
// // import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'
// // import { showSuccessMsg } from '../services/event-bus.service'

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

// export const boardService = {

//     getTask,
//     getMembers,
//     getLabels,
//     getMemberById,
//     // subscribe,
//     // unsubscribe,
// }

// async function getMemberById(memberId) {
//     try {
//         const members = await getMembers()
//         const member = members.filter(member => member._id === memberId)
//         return member[0]
//     } catch (error) {
//         throw _logError(error)
//     }

// }







// const _logError = (err) => {
//     return err
// }

// function _getEmptyBoard() {
//     return emptyBoard
// }


// // storageService.post(STORAGE_KEY, jsonBoard)






