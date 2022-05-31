import React from "react"

import { BoardPreview } from './board-preview'

export const BoardList = ({ boards, userId, toggleStar }) => {


    const boardsRelated = boards.filter(board => board.usersRelated.includes(userId))
    const starredBoards = boardsRelated.filter(board => board.isStarred === true)


    return <div className="workspace-container">
        {starredBoards.length > 0 && <section className="board-container">
            <section className="board-preview-header">
                <div className="icon-wrapper">
                    <h4>Star icon</h4>
                </div>
                <h1>Starred boards</h1>
            </section>
            <div className="boards-wrapper">
                {starredBoards.map(board => {
                    return <BoardPreview board={board} toggleStar={toggleStar} />
                })}
            </div>
        </section>}
        {boardsRelated.length > 0 && <section className="board-container" >
            <section className="board-preview-header">
                <div className="icon-wrapper">
                    <h4>icon</h4>
                </div>
                <h1>My boards</h1>
            </section>
            <div className="boards-wrapper" >
                {boardsRelated.map(board => {
                    return <BoardPreview board={board} toggleStar={toggleStar} />
                })}
            </div>
        </section>}
        {/* {templates > 0 && <section className="board-container">
            <section className="board-preview-header">
                <h4>icon</h4>
                <h1>Templates</h1>
            </section>
            <BoardPreview count={templates} />
        </section>} */}
    </div>
}
