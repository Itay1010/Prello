//basic
import React, { useState } from "react"
import { connect } from 'react-redux'

//libs
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import getAverageColor from 'get-average-color'

//services
import { boardService } from "../services/board/board.service";

//private
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
import { actService } from "../services/board/activity.service";

class _Board extends React.Component {
    state = {
        board: null
    }

    componentDidMount() {
        this._setBoard()
    }

    componentDidUpdate() {
        this.setTheme()

    }

    // setTheme = async () => {
    //     if (this.props.board.style.backgroundColor) {
    //         document.querySelector('.main-header').style.backgroundColor = '#00000090'
    //         document.querySelector('.board').style.backgroundColor = this.props.board.style.backgroundColor
    //     }
    //     if (this.props.board.style.background) {
    //         const avgColor = await boardService.getAvgColor(this.props.board.style.background)
    //         if (avgColor === "#ffffff") document.querySelector('.main-header').style.backgroundColor = '#00000090'
    //         else if (avgColor === '#000000') document.querySelector('.main-header').style.backgroundColor = '#ffffff90'
    //         else document.querySelector('.main-header').style.backgroundColor = avgColor

    //         document.querySelector('.board').style.background = `url(${this.props.board.style.background};)`
    //     }


    // }
    setTheme = async () => {
        if (this.state.board.style.backgroundColor) {
            document.querySelector('.main-header').style.backgroundColor = '#00000090'
            document.querySelector('.board').style.backgroundColor = this.state.board.style.backgroundColor
        }
        if (this.state.board.style.background) {
            const avgColor = await boardService.getAvgColor(this.state.board.style.background)
            if (avgColor === "#ffffff") document.querySelector('.main-header').style.backgroundColor = '#00000090'
            else if (avgColor === '#000000') document.querySelector('.main-header').style.backgroundColor = '#ffffff90'
            else document.querySelector('.main-header').style.backgroundColor = avgColor

            document.querySelector('.board').style.background = `url(${this.state.board.style.background};)`
        }


    }

    onSaveBoard = (board) => {
        console.log(board)
        this.props.updateBoard(board)
        this.setState({ board })
        // dispatch(updateBoard(newBoard))
    }


    // _getAvgColor = async (url) => {
    //     const RGB = await getAverageColor(url)
    //     const HEX = this._rgbToHex(RGB)
    //     return HEX
    // }

    // _rgbToHex = ({ r, g, b }) => {
    //     return "#" + this._componentToHex(r) + this._componentToHex(g) + this._componentToHex(b);
    // }

    // _componentToHex = (cmp) => {
    //     const hex = cmp.toString(16)
    //     return hex.length === 1 ? "0" + hex : hex
    // }

    _setBoard = async () => {
        const { boardId } = this.props.match.params
        console.log(boardId)
        const board = await this.props.loadBoard(boardId)
        console.log(board)
        this.setState({ board })
    }

    onAddTask = async (newTask) => {
        if (!newTask.title) return
        const newBoard = JSON.parse(JSON.stringify(this.props.board))
        const groupIdx = newBoard.groups.findIndex(group => group.id === newTask.groupId)

        newTask = { id: utilService.makeId(), title: newTask.title }
        newBoard.groups[groupIdx].tasks.push(newTask)
        actService.activity('added', 'card,', newTask, newBoard.activities)
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
        newBoard.groups.map(group => {
            if (group.id === groupId) group.archivedAt = Date.now()
        })
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

    render() {

        // const { board } = this.props
        // console.log('_Board - render - board rendered')
        const { board } = this.state
        if (!board) return <div>loading...</div>
        // console.log(board);
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
                    <BoardHeader board={board} saveBoardHeader={this.onSaveBoardHeader} />
                    <GroupList groups={groups} eventHandlers={eventHandlers} />
                    <Switch>
                        <Route path={'/board/:boardId/:groupId/:taskId'}>
                            <TaskDetails onArchiveTask={this.onArchiveTask} onSaveBoard={this.onSaveBoard} />
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



const task = {
    bgImg: 'https://images.unsplash.com/photo-1653759588370-03395fadcbd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1219&q=80',
    bgColor: null
}


export const BoardList = (task) => {

    // const { bgImg } = task
    // async function printAverageColor() {
    //     const color = await getAverageColor(bgImg);
    //     console.log(color);
    //     // document.querySelector('.main-header').style.backgroundColor = color
    //     // const elHeader = document.querySelector('.main-header')
    // }

    // printAverageColor()

    // return <div className="workspace-container">

    // </div>
}

// export const BoardList = () => {
//     // console.log(task);
//     const { bgImg } = task
//     const fac = new FastAverageColor()
//     const elHeader = document.querySelector('.main-header')
//     const color = fac.getColor(bgImg)

//     console.log(color);

//     return <div className="workspace-container">

//     </div>
// }
