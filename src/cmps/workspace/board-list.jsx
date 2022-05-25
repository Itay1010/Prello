import React from "react"

import { BoardPreview } from './board-preview'

export const BoardList = () => {
    return <div className="workspace-container">
        <section className="board-container">
            <section className="board-preview-header">
                <h4>Star icon</h4>
                <h1>Starred boards</h1>
            </section>
            <BoardPreview count={2}/>
        </section>
        <section className="board-container">
            <section className="board-preview-header">
                <h4>icon</h4>
                <h1>My boards</h1>
            </section>
            <BoardPreview count={1}/>
        </section>
        <section className="board-container">
            <section className="board-preview-header">
                <h4>icon</h4>
                <h1>Templates</h1>
            </section>
            <BoardPreview count={5}/>
        </section>
    </div>
}
