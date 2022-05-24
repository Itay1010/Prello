import React from "react"
import { MainHeader } from "../cmps/shared cmps/main-header"

import { TaskList } from '../cmps/workspace/board-list'
import { TaskPreview } from '../cmps/board/task-preview'

export const Board = () => {
    return <React.Fragment>
        <MainHeader />
        <section className="board">
            <header>
                Board's header
            </header>
            <section className="group-container flex">
                <section className="group flex col">
                    <header>
                        group's title
                    </header>
                    <div className="list-task">
                        <TaskPreview />
                    </div>
                    <footer className="flex space-between">
                        <a href="">Add a card</a>
                        <p>D</p>
                    </footer>
                </section>
                <section className="group flex col">
                    <header>
                        group's title
                    </header>
                    <div className="list-task">
                        <TaskPreview />
                    </div>
                    <footer className="flex space-between">
                        <a href="">Add a card</a>
                        <p>D</p>
                    </footer>
                </section>
                <section className="group flex col">
                    <header>
                        group's title
                    </header>
                    <div className="list-task">
                        <TaskPreview />
                    </div>
                    <footer className="flex space-between">
                        <a href="">Add a card</a>
                        <p>D</p>
                    </footer>
                </section>
            </section>
        </section>

    </React.Fragment>

}