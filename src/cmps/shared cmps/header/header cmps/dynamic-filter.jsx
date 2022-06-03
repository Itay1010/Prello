import React from 'react'
import { useHistory } from 'react-router-dom'
import { IStar } from '../../../icons/i-star'



export const DynamicFilter = ({ boards, modalType }) => {
    const history = useHistory()
    console.log(boards)

    const onGoTo = (boardId) => {
        history.push(`/board/${boardId}`)
    }
    return <ul className='dynamic-filter'>
        <h3>{modalType}</h3>
        {boards.map(board => {
            return <li className='filter-item' onClick={() => onGoTo(board._id)}>
                <img src={`${board.style.background}`} alt="" />
                <p>{board.title}</p>
                <div className={`star-wrapper ${board.isStarred ? 'starred' : ''}`}><IStar /></div>
            </li>
        })}
    </ul>
}