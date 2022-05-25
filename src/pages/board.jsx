import React from "react"
import { MainHeader } from "../cmps/shared cmps/header/main-header"


import { Group } from '../cmps/board/task-list'
import { TaskPreview } from '../cmps/board/task-preview'
// import { loadBoard } from "../store/board/board.action"

export class Board extends React.Component {

    // componentDidMount(){
    //     const boardId=this.props.match.params

    // }

    render() {

        return <React.Fragment>
            <section className="board">
            <MainHeader />
                <div className="board-header">
                    Board's header
                </div>
                <section className="group-container flex">
                    <Group />
                </section>
            </section>
        </React.Fragment>

    }
}

{/* <section className="group flex col">
    <div className="group-header">
        <textarea maxLength="521">group's title</textarea>
    </div>
    <div className="list-task">
        <TaskPreview />
    </div>
    <div className="group-footer flex space-between align-center">
        <a href="">Add a card</a>
        <div className="add-media"></div>
    </div>
</section>
<section className="group flex col">
    <div className="group-header">
        <textarea maxLength="521">group's title</textarea>
    </div>
    <div className="list-task">
        <TaskPreview />
    </div>
    <div className="group-footer flex space-between align-center">
        <a href="">Add a card</a>
        <div className="add-media"></div>
    </div>
</section>
<section className="group flex col">
    <div className="group-header">
        <textarea maxLength="521">group's title</textarea>
    </div>
    <div className="list-task">
        <TaskPreview />
    </div>
    <div className="group-footer flex space-between align-center">
        <a href="">Add a card</a>
        <div className="add-media"></div>
    </div>
</section>
<section className="group flex col">
    <div className="group-header">
        <textarea maxLength="521">group's title</textarea>
    </div>
    <div className="list-task">
        <TaskPreview />
    </div>
    <div className="group-footer flex space-between align-center">
        <a href="">Add a card</a>
        <div className="add-media"></div>
    </div>
</section>
<section className="group flex col">
    <div className="group-header">
        <textarea maxLength="521">group's title</textarea>
    </div>
    <div className="list-task">
        <TaskPreview />
    </div>
    <div className="group-footer flex space-between align-center">
        <a href="">Add a card</a>
        <div className="add-media"></div>
    </div>
</section>
</section>*/}