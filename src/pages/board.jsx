//basic
import React, { useState } from "react"
import { connect } from 'react-redux'

//libs
import { TextareaAutosize } from '@mui/material';

//privet
import { MainHeader } from "../cmps/shared cmps/header/main-header"
import { Group } from '../cmps/board/task-list'
import { BoardHeader } from "../cmps/board/board-header/board-header"

import { setBoard, updateBoard } from "../store/board/board.action"
import { boardService } from "../services/board/board.service"
import { utilService } from "../services/basic/util.service"
import { groupService } from "../services/board/group.service";
// import { Switch } from "react-router-dom/cjs/react-router-dom.min"
import { Switch, Route } from 'react-router-dom'

// Routes
import { TaskDetails } from './task-details.jsx'
import { taskService } from "../services/board/task.service";

class _Board extends React.Component {

    componentDidMount() {
        this._loadBoard()
    }

    _loadBoard = async () => {
        const { boardId } = this.props.match.params
        const board = await boardService.getById(boardId)
        this.props.setBoard(board)
    }

    onAddTask = async (newTask) => {
        taskService.addTask(newTask)
    }

    onArchiveTask = async (task) => {
        taskService.archiveTask(task)
    }

    onArchiveGroup = async (groupId) => {
        groupService.archiveGroup(groupId)
    }

    onGroupChange = async (pack) => {
        groupService.groupChange(pack)
    }

    render() {
        const { board } = this.props
        console.log('_Board - render - board', board)
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
                    <Route path={'/board/:boardId/task/:taskId'} component={TaskDetails} />
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
    setBoard,
    updateBoard,
    // removeReview
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)