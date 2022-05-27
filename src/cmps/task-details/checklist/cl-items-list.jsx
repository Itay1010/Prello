import React from 'react'
import { ClTask } from './cl-task.jsx'

export const ClItemsList = ({ items, setIsDone, checklistId, deleteClTask }) => {
    return < div className='cl-items-list' >
        {
            items.map(item => {
                return <ClTask checklistId={checklistId} key={item.id} item={item} setIsDone={setIsDone} deleteClTask={deleteClTask} />
            })
        }
    </div >
}