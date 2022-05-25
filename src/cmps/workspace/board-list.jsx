import React from "react"

import { BoardPreview } from './board-preview'

export const BoardList = () => {
    return <div className="workspace-container">
        {[<BoardPreview />, <BoardPreview />, <BoardPreview />]}
    </div>
}
