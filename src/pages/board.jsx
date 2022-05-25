import React from "react"
import { connect } from 'react-redux'
import { MainHeader } from "../cmps/shared cmps/main-header"


import { Group } from '../cmps/board/task-list'
import { TaskPreview } from '../cmps/board/task-preview'
import { loadBoard } from "../store/board/board.action"
import { boardService } from "../services/board/board.service"

class _Board extends React.Component {

    state = {
        board: null
    }


    componentDidMount() {
        const { boardId } = this.props.match.params
        console.log(boardId)
        boardService.getById(boardId).then(board => this.setState({ board: board }, () => console.log(this.state)))

    }

    render() {
        const board = this.state.board
        if (!board) return <div>loading...</div>
        const { groups } = board
        console.log(groups)

        return <React.Fragment>
            <section className="board">
            <MainHeader />
                <div className="board-header">
                    Board's header
                </div>
                <section className="group-container flex">
                    {groups.map(group => {
                        return <Group group={group} />
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