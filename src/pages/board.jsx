//basic
import React, { useState } from "react"
import { connect } from 'react-redux'

//libs
import { TextareaAutosize } from '@mui/material';

//privet
import { MainHeader } from "../cmps/shared cmps/header/main-header"
import { Group } from '../cmps/board/task-list'
import { BoardHeader } from "../cmps/board/board-header/board-header"

import { loadBoard, updateBoard } from "../store/board/board.action"
import { utilService } from "../services/basic/util.service"
// import { Switch } from "react-router-dom/cjs/react-router-dom.min"
import { Switch, Route } from 'react-router-dom'

// Routes
import { TaskDetails } from './task-details.jsx'

class _Board extends React.Component {

    componentDidMount() {
        this._setBoard()
    }

    _setBoard = async () => {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId)
    }

    onAddTask = async (newTask) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        const groupIdx = newBoard.groups.findIndex(group => group.id === newTask.groupId)

        newTask = { id: utilService.makeId(), title: newTask.title }
        newBoard.groups[groupIdx].tasks.push(newTask)
        this.props.updateBoard(newBoard)
    }

    onArchiveTask = async ({ taskId, groupId }) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)

        newBoard.groups[groupIdx].tasks.map(task => {
            if (task.id === taskId) task.archivedAt = Date.now()
        })
        this.props.updateBoard(newBoard)
    }

    onArchiveGroup = async (groupId) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))

        newBoard.groups.map(group => {
            if (group.id === groupId) group.archivedAt = Date.now()
        })
        this.props.updateBoard(newBoard)
    }

    onGroupChange = async ({ txt, groupId }) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        newBoard.groups.map(group => {
            if (group.id === groupId) group.title = txt
        })
        this.props.updateBoard(newBoard)
    }

    render() {
        const { board } = this.props
        // console.log('_Board - render - board', board)
        if (!board) return <div>loading...</div>
        const { groups } = board

        return <React.Fragment>
            <MainHeader />
            <section className="board flex col main-layout">
                <BoardHeader board={board} />
                <section className="group-container flex">
                    {groups.map(group => {
                        if (group.archivedAt) return
                        return <Group group={group}
                            onAddTask={this.onAddTask}
                            onArchiveTask={this.onArchiveTask}
                            onArchiveGroup={this.onArchiveGroup}
                            onGroupChange={this.onGroupChange}
                        />
                    })}
                    <button style={({ height: "40px", width: "270px" })}>Add another list</button>
                </section>
                <Switch>
                    <Route path={'/board/:boardId/:groupId/:taskId'} component={TaskDetails} />
                </Switch>
            </section>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.selectedBoard,
        //   users: state.userModule.users,
        //   loggedInUser: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadBoard,
    updateBoard,
    // removeReview
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)