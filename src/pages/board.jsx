//basic
import React, { useState } from "react"
import { connect } from 'react-redux'

//libs
import { TextareaAutosize } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//privet
import { MainHeader } from "../cmps/shared cmps/header/main-header"
import { BoardHeader } from "../cmps/board/board-header/board-header"
import { AddGroupForm } from "../cmps/board/add-group-form"

import { loadBoard, updateBoard } from "../store/board/board.action"
import { utilService } from "../services/basic/util.service"
// import { Switch } from "react-router-dom/cjs/react-router-dom.min"
import { Switch, Route } from 'react-router-dom'

// Routes
import { TaskDetails } from './task-details.jsx'
import { GroupList } from "../cmps/board/group-list";
class _Board extends React.Component {

    componentDidMount() {
        this._setBoard()
    }

    _setBoard = async () => {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId)
    }

    onAddTask = async (newTask) => {
        if (!newTask.title) return
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
        console.log(groupId);
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

    onAddGroup = async (title) => {
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        const newGroup = { id: utilService.makeId(), title, tasks: [] }
        newBoard.groups.push(newGroup)
        this.props.updateBoard(newBoard)
    }


    handleOnDragEnd = (result) => {
        // console.log('handle', result)
        if (!result.destination) return
        const { board } = this.props
        const newBoard = JSON.parse(JSON.stringify(board))

        const items = newBoard.groups
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        this.props.updateBoard(newBoard)
    }

    render() {
        const { board } = this.props
        // console.log('_Board - render - board', board)
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
                <MainHeader />
                <section className="board flex col main-layout">
                    <BoardHeader board={board} />
                    <GroupList groups={groups} eventHandlers={eventHandlers} />
                    <Switch>
                        <Route path={'/board/:boardId/:groupId/:taskId'} component={TaskDetails} />
                    </Switch>
                </section>
            </DragDropContext>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
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