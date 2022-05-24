import React from "react"
import { BoardList } from '../cmps/workspace/board-list'


export const Workspace = () => {
    return <section className="workspace-wrapper">
        <section className="board-container">
            <section className="board-list-header">container header</section>
            <section className="board-list">
                <div>board</div>
                <div>board</div>
                <div>board</div>
            </section>
        </section>
        <section className="board-container">
            <section className="board-list-header">container header</section>
            <section className="board-list">
                <div>board</div>
                <div>board</div>
                <div>board</div>
            </section>
        </section>
        <section className="board-container">
            <section className="board-list-header">container header</section>
            <section className="board-list">
                <div>board</div>
                <div>board</div>
                <div>board</div>
            </section>
        </section>
    </section>
}