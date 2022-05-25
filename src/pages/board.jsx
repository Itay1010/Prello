import React from "react"
import { connect } from 'react-redux'
import { MainHeader } from "../cmps/shared cmps/header/main-header"


import { Group } from '../cmps/board/task-list'
import { BoardHeader } from "../cmps/board/board-header/board-header"
import { TaskPreview } from '../cmps/board/task-preview'
import { loadBoard } from "../store/board/board.action"
import { boardService } from "../services/board/board.service"
import { utilService } from "../services/basic/util.service"

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
            this.setState((prevState) => ({ ...prevState, newBoard }))
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
            <section className="board flex col">
                <MainHeader />
                <BoardHeader board={board} />
                <section className="group-container flex">
                    {groups.map(group => {
                        return <Group group={group} onAddTask={this.onAddTask} />
                    })}
                </section>
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