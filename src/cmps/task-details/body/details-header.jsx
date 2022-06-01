import { TextareaAutosize } from '@mui/material'
import React, { useState } from 'react'
import { ITask } from '../../icons/i-task'

export const DetailsHeader = ({ task, group, onGoBack, saveTaskTitle }) => {
    const [title, setTitleValue] = useState(task.title)
    let height

    const handleTitleChange = ({ target }) => {
        height = 'auto'
        let titleHeight = target.scrollHeight
        height = `${titleHeight}`
        setTitleValue(target.value)
    }
    return <div className='task-header flex'>
        <div className='close-modal flex justify-center align-center' onClick={onGoBack}><svg width="24" height="24" viewBox="0 0 24 24" ><path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" /></svg></div>
        <div className='section-icon'>
            <ITask />
        </div>
        <div className="section-data flex col">
            <TextareaAutosize
                className='task-title'
                onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                        ev.preventDefault()
                        ev.target.blur()
                    }
                }}
                onChange={handleTitleChange}
                onBlur={ev => saveTaskTitle(title)}
                maxRows={4}
                aria-label="maximum height"
                placeholder='Add a more detailed description...'
                defaultValue={task.title ? task.title : ''}
            />
            <p>in list {group.title}</p>
        </div>
    </div>
}