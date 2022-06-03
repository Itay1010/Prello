import React from 'react'
import { BoardData } from './board-data'
import { BoardFeatures } from './board-features'
import { BoardMembers } from './board-members'
export function BoardHeader({ board, saveBoardHeader, setBackgroundImg }) {
    return <section className="board-header flex space-between align-center">
        <BoardData board={board} saveBoardHeader={saveBoardHeader} />
        <BoardFeatures board={board} setBackgroundImg={setBackgroundImg} />
        {/* <BoardMembers board={board}/> */}
    </section>
}