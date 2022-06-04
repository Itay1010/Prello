import React from 'react'
import { BoardData } from './board-data'
import { BoardFeatures } from './board-features'
export function BoardHeader({ board, saveBoardHeader, setBackgroundImg, starBoard }) {
    return <section className="board-header flex space-between">
        <BoardData board={board} saveBoardHeader={saveBoardHeader} starBoard={starBoard} />
        <BoardFeatures board={board} setBackgroundImg={setBackgroundImg} />
    </section>
}