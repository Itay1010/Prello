import { utilService } from '../../services/basic/util.service'
import { storageService } from '../basic/async-storage.service'
// import { httpService } from '../basic/http.service'
import { getActionSetBoard, getActionRemoveBoard } from '../../store/board/board.action'
import { userService } from "../../services/user.service";
import { useState } from 'react';
const emptyBoard = require('../../data/empty-board.json')
const jsonBoard = require('../../data/prello-boards.json')
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
    remove,
    getById,
    save,
    getMembers
    // subscribe,
    // unsubscribe,
}


async function getById(boardId) {
    try {
        return await storageService.get(STORAGE_KEY, boardId)
    } catch (error) {
        throw _logError(error)
    }
    // return httpService.get(`/api/board/${boardId}`)
}

async function remove(boardId) {
    try {
        // reviewChannel.postMessage(getActionRemoveReview(reviewId))
        // return await httpService.delete(`review/${reviewId}`)
        return await storageService.remove(STORAGE_KEY, boardId)
    } catch (error) {
        throw _logError(error)
    }
}

async function save(board) {
    throw new Error('opps')
    var savedBoard
    try {
        if (board._id) {
            savedBoard = await storageService.put(STORAGE_KEY, board)
            // boardChannel.postMessage(getActionUpdateBoard(savedBoard))
            return savedBoard
        } else {
            // Later, owner is set by the backend
            board = { ..._getEmptyBoard(), createdAt: Date.now(), title: board.title }
            board.createdBy = userService.getLoggedinUser() || {
                "_id": "g",
                "firstName": "Guest",
                "imgUrl": utilService.getRandomColor()
            }
            savedBoard = await storageService.post(STORAGE_KEY, board)
            // boardChannel.postMessage(getActionAddBoard(savedBoard))
            return savedBoard
        }
    } catch (error) {
        throw _logError(error)
    }
}

async function getMembers() {
    const board = await getById('b101')
    return board.members
}

const _logError = (err) => {
    console.log('error in board service', err)
    return err
}

function _getEmptyBoard() {
    return emptyBoard
}

// ;(async ()=>{
//     await userService.create({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
//     await userService.create({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.create({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()

// storageService.post(STORAGE_KEY, jsonBoard)






