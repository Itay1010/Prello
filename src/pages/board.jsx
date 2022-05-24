import React from "react"
import { MainHeader } from "../cmps/shared cmps/main-header"

import { TaskList } from '../cmps/workspace/board-list'

export const Board = () => {
    return <React.Fragment>
        <MainHeader />
        <section className="board">
            <header>
                Board's header
            </header>
            <section className="group-container flex">
                <section className="group">
                    group
                </section>
                <section className="group">
                    group
                </section>
                <section className="group">
                    group
                </section>
            </section>
        </section>

    </React.Fragment>

}