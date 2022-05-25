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
                    <div className="group-header">
                        <textarea maxLength="521">group's title</textarea>
                    </div>
                    <div className="list-task">
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
                        <TaskPreview />
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
            </section>
        </section>

    </React.Fragment>

}