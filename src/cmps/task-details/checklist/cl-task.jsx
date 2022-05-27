import React from 'react'

export const ClTask = ({ item, setIsDone, checklistId }) => {
    const receivedItem = item

    const toggleIsDone = () => {
        receivedItem.isDone = !receivedItem.isDone
        setIsDone(checklistId, receivedItem)
    }


    return <div className='cl-task'><div className='space'>

        <input type="checkbox" onChange={toggleIsDone} checked={receivedItem.isDone ? 'checked' : ''} /></div><span>{receivedItem.txt}</span></div>
}