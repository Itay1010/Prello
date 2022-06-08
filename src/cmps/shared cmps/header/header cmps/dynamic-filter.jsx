import React from 'react'
import { useHistory } from 'react-router-dom'
import { IStar } from '../../../icons/i-star'



export const DynamicFilter = ({ boards, modalType, toggleStar, setModal }) => {
    const history = useHistory()

    const onGoTo = (boardId) => {
        history.push(`/board/${boardId}`)
        setModal(false)
    }
    return <ul className='dynamic-filter'>
        <h3>{modalType === 'starred' ? 'Starred boards' : 'Recent boards'}</h3>

        {boards.map(board => {
            return <li key={board._id} className='filter-item' onClick={() => onGoTo(board._id)}>
                {board.style.background && <img src={`${board.style.background}`} alt='' />}
                <p>{board.title}</p>
                <div onClick={toggleStar} className={`star-wrapper ${board.isStarred ? 'starred' : ''}`}><IStar /></div>
            </li>
        })}
    </ul>
}