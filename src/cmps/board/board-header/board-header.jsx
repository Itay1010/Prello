import React from 'react'
import { BoardData } from './board-data'
import { BoardFeatures } from './board-features'

export function BoardHeader({ board }) {
    return <section className="board-header flex space-between align-center">
        <BoardData board={board} />
        <BoardFeatures board={board} />
    </section>
}