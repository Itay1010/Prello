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
    getTask,
    getMembers,
    getLabels,
    getMemberById,
    // subscribe,
    // unsubscribe,
}

async function getMemberById(memberId) {
    console.log(memberId);
    try {
        const members = await getMembers()
        console.log(members);
        const member = members.filter(member => member._id === memberId)
        return member[0]
    } catch (error) {
        throw _logError(error)
    }

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

async function getTask(boardId = 'b101', groupId = 'g102', taskId) {
    const board = await getById(boardId)
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    return task
}

async function getMembers(boardId = 'b101') {
    const board = await getById(boardId)
    return board.members
}

function getLabels() {
    return ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf']
}

const _logError = (err) => {
    console.log('error in board service', err)
    return err
}

function _getEmptyBoard() {
    return emptyBoard
}


// storageService.post(STORAGE_KEY, jsonBoard)






