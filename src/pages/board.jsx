//basic
import React, { useState } from "react"
import { connect } from 'react-redux'

//libs
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

//services
import { boardService } from "../services/board/board.service"

//private
import { MainHeader } from "../cmps/shared cmps/header/main-header"
import { BoardHeader } from "../cmps/board/board-header/board-header"

import { loadBoard, updateBoard } from "../store/board/board.action"
import { utilService } from "../services/basic/util.service"
import { Switch, Route } from 'react-router-dom'

// Routes
import { TaskDetails } from './task-details.jsx'
import { GroupList } from "../cmps/board/group-list"
import { actService } from "../services/board/activity.service"
import { Dashboard } from "./dashboard"
import { socketService } from "../services/basic/socket.service"
import { useSelector } from "react-redux"
import { loadGuest } from "../store/user/user.actions"

const tinycolor = require("tinycolor2")

class _Board extends React.Component {

    componentDidMount() {
        this._loadUserToStore()
        this._setBoard()
    }

    deepCloneBoard = () => {
        const { board } = this.props
        return JSON.parse(JSON.stringify(board))
    }

    componentDidUpdate() {
        this.setTheme()
    }

    componentWillUnmount(nextProps, nextState) {
        document.querySelector('#root').style.background = 'initial'
        socketService.logout()
    }

    _loadUserToStore = () => {
        const { loggedinUser, loadGuest } = this.props
        if (!loggedinUser) loadGuest()
        socketService.setup()
    }

    setTheme = async () => {
        const boardStyle = this.props.board.style
        if (boardStyle.backgroundColor) {
            document.querySelector('.main-header').style.backgroundColor = '#00000090'
            document.querySelector('.board').style.backgroundColor = boardStyle.backgroundColor
        }
        if (boardStyle.background) {
            const avgColor = await boardService.getAvgColor(boardStyle.background)
            const isDark = tinycolor(avgColor).isDark()
            utilService.setDynamicColors(isDark, avgColor)
            document.querySelector('#root').style.background = `url(${boardStyle.background})`
        }
    }

    _setBoard = async () => {
        const { boardId } = this.props.match.params
        const board = await this.props.loadBoard(boardId)
        this.setState({ board })
    }

    onAddTask = async (newTask) => {
        if (!newTask.title) return
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        const groupIdx = newBoard.groups.findIndex(group => group.id === newTask.groupId)

        newTask = { id: utilService.makeId(), title: newTask.title }
        newBoard.groups[groupIdx].tasks.push(newTask)
        actService.activity('added', 'card,', newTask, newBoard)
        this.props.updateBoard(newBoard)
    }

    onArchiveTask = async ({ taskId, groupId }) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        var archivedTask
        newBoard.groups[groupIdx].tasks.map(task => {
            if (task.id === taskId) {
                task.archivedAt = Date.now()
                archivedTask = task
            }
        })
        actService.activity('archived', 'card', archivedTask, newBoard)
        this.props.updateBoard(newBoard)
    }
    onArchiveGroup = async (groupId) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        var archivedGroup
        newBoard.groups.map(group => {
            if (group.id === groupId) {
                group.archivedAt = Date.now()
                archivedGroup = group
            }
        })
        actService.activity('archived', 'group', archivedGroup, newBoard)
        console.log('_Board - onArchiveGroup= - newBoard', newBoard.activities)
        this.props.updateBoard(newBoard)
    }

    onGroupChange = async ({ txt, groupId }) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        if (newBoard.groups[groupIdx].title === txt) return
        newBoard.groups[groupIdx].title = txt
        actService.activity('changed title in', 'group', newBoard.groups[groupIdx], newBoard)
        console.log('_Board - onGroupChange= - newBoard', newBoard.activities)
        this.props.updateBoard(newBoard)
    }

    onAddGroup = async (title) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        const newGroup = { id: utilService.makeId(), title, tasks: [] }
        newBoard.groups.push(newGroup)
        this.props.updateBoard(newBoard)
    }


    handleOnDragEnd = (result) => {
        if (!result.destination) return
        const { board } = this.props
        const newBoard = JSON.parse(JSON.stringify(board))

        if (result.type === 'groups') {
            const items = newBoard.groups
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(result.destination.index, 0, reorderedItem)
            this.props.updateBoard(newBoard)
        } else {
            const items = newBoard.groups.find(group => group.id === result.source.droppableId).tasks
            const { droppableId: desDroppableId, index: desIdx } = result.destination
            const { droppableId: SrcDroppableId, index: SrcIdx } = result.source
            const [reorderedItem] = items.splice(SrcIdx, 1)
            newBoard.groups.find(group => group.id === desDroppableId).tasks.splice(desIdx, 0, reorderedItem)
            if (!(desDroppableId === SrcDroppableId) || !(desIdx === SrcIdx)) {
                actService.activity('moved', 'card', reorderedItem, newBoard)
            }
            this.props.updateBoard(newBoard)
        }
    }

    onSaveBoardHeader = (newBoardHeader) => {
        const { board } = this.props
        const newBoard = JSON.parse(JSON.stringify(board))
        newBoard.title = newBoardHeader
        this.props.updateBoard(newBoard)
    }

    setBackgroundImgFromUnsplash = (url) => {
        const newBoard = this.deepCloneBoard()
        newBoard.style.background = url
        this.props.updateBoard(newBoard)
    }

    render() {
        const { board } = this.props
        if (!board) return <div>loading...</div>
        const { groups } = board
        const eventHandlers = {
            onAddTask: this.onAddTask,
            onArchiveTask: this.onArchiveTask,
            onGroupChange: this.onGroupChange,
            onAddGroup: this.onAddGroup,
            onArchiveGroup: this.onArchiveGroup
        }

        return <React.Fragment>
            <DragDropContext onDragEnd={this.handleOnDragEnd}>
                <MainHeader boardMembers={board.members} />
                <section className="board flex col main-layout">
                    <BoardHeader board={board} saveBoardHeader={this.onSaveBoardHeader} setBackgroundImg={this.setBackgroundImgFromUnsplash} />
                    <GroupList groups={groups} eventHandlers={eventHandlers} />
                    <Switch>
                        <Route path={'/board/:boardId/:groupId/:taskId'}>
                            <TaskDetails onArchiveTask={this.onArchiveTask} />
                        </Route>
                        <Route path={'/board/:boardId/dashboard'}>
                            <Dashboard board={this.props.board} />
                        </Route>
                    </Switch>
                </section>
            </DragDropContext>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
        loggedinUser: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadBoard,
    updateBoard,
    loadGuest
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)
