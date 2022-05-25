import React from "react"
import { MainHeader } from "../cmps/shared cmps/main-header"
import { BoardList } from '../cmps/workspace/board-list'
import { boardService } from "../services/board/board.service"


export const Workspace = () => {
    return <section className="workspace-wrapper">
        <MainHeader />
        <BoardList />
    </section>
}