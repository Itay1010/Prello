import React from "react"
import { MainHeader } from "../cmps/shared cmps/header/main-header"
import { BoardList } from '../cmps/workspace/board-list'


export const Workspace = () => {
    return <section className="workspace-wrapper">
        <MainHeader />
        <BoardList />
    </section>
}