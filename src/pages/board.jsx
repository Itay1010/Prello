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
        this.setState({ board: boardService.getById(boardId) })
    }

    render() {

        return <React.Fragment>
            <MainHeader />
            <section className="board">
                <header>
                    Board's header
                </header>
                <section className="group-container flex">
                    <Group />
                </section>
            </section>
        </React.Fragment>

    }
}


const mapStateToProps = state => {
    return {
        boards: state.boardModule.boards,
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