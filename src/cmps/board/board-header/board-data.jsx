import React, { useEffect, useState } from 'react'
import { TxtInputCmp } from '../../shared cmps/txt-input-cmp.jsx'
import { useHistory } from 'react-router-dom'
import { BoardMembers } from './members-cmps/board-members'
import { IStar } from '../../icons/i-star.jsx'


export const BoardData = ({ board, saveBoardHeader, starBoard, onChangeMembers }) => {
    const history = useHistory()

    const [isBoardTitleEditable, setBoardTitleEditable] = useState(false)

    useEffect(() => {
    }, [board.title])

    const handleBoardTitleChange = (value) => {
        saveBoardHeader(value)
    }

    return <section className='board-data flex'>
        {/* <button onClick={ev => history.push(`${history.location.pathname}/dashboard`)}>Dashboard</button> */}
        <TxtInputCmp isBoardTitleEditable={isBoardTitleEditable}
            boardTitle={board.title}
            handleBoardTitleChange={handleBoardTitleChange}
        />
        <div onClick={starBoard} className={`btn-stared flex align-center justify-center ${board.isStarred ? 'is-starred' : 'not-starred'}`}>
            <IStar />
        </div>
        <BoardMembers board={board} onChangeMembers={onChangeMembers} />
    </section>
}