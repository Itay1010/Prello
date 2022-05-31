import React from "react"
import { useHistory } from "react-router-dom"

export const BoardPreview = ({ board, toggleStar }) => {
    const history = useHistory()
    const onGoToBoard = (boardId) => {
        history.push(`/board/${boardId}`)
    }

    const background = board.style.background ? board.style.background : board.style.backgroundColor
    return <div className="board-preview-body" onClick={() => onGoToBoard(board._id)} style={{ backgroundImage: `url('${background})` }}>
        <h1>{board.title}</h1>
        <div className="star-wrapper" onClick={(event) => {
            event.stopPropagation()
            toggleStar(board)
        }
        }
        >star</div>
    </div>
}