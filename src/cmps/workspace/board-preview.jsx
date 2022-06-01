import React from "react"
import { useHistory } from "react-router-dom"
import { IStar } from "../icons/i-star"

export const BoardPreview = ({ board, toggleStar }) => {
    const history = useHistory()
    const onGoToBoard = (boardId) => {
        history.push(`/board/${boardId}`)
    }
    console.log('board', board);
    const background = board.style.background ? board.style.background : board.style.backgroundColor
    return (<div className={board.isStarred ? "board-preview-body starred" : "board-preview-body"} onClick={() => onGoToBoard(board._id)} style={{ backgroundImage: `url('${background})` }}>
        {/* <img src={background} alt="" /> */}
        <h1>{board.title}</h1>
        <div className="star-wrapper" onClick={(event) => {
            event.stopPropagation()
            toggleStar(board)
        }}> <IStar /> </div>

    </div>
    )
}