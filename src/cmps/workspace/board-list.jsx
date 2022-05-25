import React from "react"

import { BoardPreview } from './board-preview'

export const BoardList = () => {
    const starred = 1
    const myBoards = 1
    const templates = 5
    return <div className="workspace-container">
        {starred > 0 && <section className="board-container">
            <section className="board-preview-header">
                <h4>Star icon</h4>
                <h1>Starred boards</h1>
            </section>
            <BoardPreview count={starred} />
        </section>}
        {myBoards > 0 && <section className="board-container">
            <section className="board-preview-header">
                <h4>icon</h4>
                <h1>My boards</h1>
            </section>
            <BoardPreview count={myBoards} />
        </section>}
        {templates > 0 && <section className="board-container">
            <section className="board-preview-header">
                <h4>icon</h4>
                <h1>Templates</h1>
            </section>
            <BoardPreview count={templates} />
        </section>}
    </div>
}
