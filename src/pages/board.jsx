import React from "react"
import { connect } from 'react-redux'
import { MainHeader } from "../cmps/shared cmps/header/main-header"


import { Group } from '../cmps/board/task-list'
import { BoardHeader } from "../cmps/board/board-header/board-header"
import { TaskPreview } from '../cmps/board/task-preview'
import { loadBoard } from "../store/board/board.action"
import { boardService } from "../services/board/board.service"
import { utilService } from "../services/basic/util.service"
// import { Switch } from "react-router-dom/cjs/react-router-dom.min"
import { Switch, Route } from 'react-router-dom'

class _Board extends React.Component {

    state = {
        board: null
    }

    componentDidMount() {
        this.loadBoard()
    }

    loadBoard = () => {
        const { boardId } = this.props.match.params
        console.log(boardId)
        boardService.getById(boardId).then(board => this.setState({ board: board }, () => console.log(this.state)))
    }

    onAddTask = async (newTask) => {
        const board = { ...this.state.board }
        const newBoard = { ...board }
        const groupIdx = board.groups.findIndex(group => group.id === newTask.groupId)

        newTask = { id: utilService.makeId(), title: newTask.title }
        newBoard.groups[groupIdx].tasks.push(newTask)

        try {
            this.setState((prevState) => ({ ...prevState, board: newBoard }))
            await boardService.save(newBoard)
        } catch (error) {
            this.setState(prevState => ({ ...prevState, board }))
            console.error('Had en error setting board', error)
        }
        this.loadBoard()
    }

    onArchiveTask = async ({ taskId, groupId }) => {
        const board = { ...this.state.board }
        const newBoard = { ...board }
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        newBoard.groups[groupIdx].tasks.map(task => {
            if (task.id === taskId) task.archivedAt = Date.now()
        })

        try {
            this.setState((prevState) => ({ ...prevState, board: newBoard }))
            await boardService.save(newBoard)
        } catch (error) {
            this.setState(prevState => ({ ...prevState, board }))
            console.error('Had en error setting board', error)
        }
        this.loadBoard()
    }

    onArchiveGroup = async (groupId) => {
        const board = { ...this.state.board }
        const newBoard = { ...board }
        newBoard.groups.map(group => {
            if (group.id === groupId) group.archivedAt = Date.now()
        })
        console.log('_Board - onArchiveGroup= - groups', newBoard.groups)

        try {
            this.setState((prevState) => ({ ...prevState, board: newBoard }))
            await boardService.save(newBoard)
        } catch (error) {
            this.setState(prevState => ({ ...prevState, board }))
            console.error('Had en error setting board', error)
        }
        this.loadBoard()
    }

    render() {
        const board = this.state.board
        if (!board) return <div>loading...</div>
        const { groups } = board
        console.log(groups)

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
                        />
                    })}
                </section>
                {/* <Switch>
                  <Route path={''}/>
                </Switch> */}
            </section>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        // boards: state.boardModule.boards,
        //   users: state.userModule.users,
        //   loggedInUser: state.userModule.user
    }
}

const mapDispatchToProps = {
    // loadBoard,
    // addReview,
    // removeReview
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)