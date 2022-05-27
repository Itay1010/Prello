import React from 'react'
import { ChecklistItemPreview } from './checklist-item-preview.jsx'


export const ChecklistList = ({ checklist, saveChecklistTask, setIsDone }) => {
    return <div className='checklist-list'>
        {checklist.map(item => {
            // console.log(item.id)
            return <ChecklistItemPreview checklistId={item.id} key={item.id} item={item} saveChecklistTask={saveChecklistTask} setIsDone={setIsDone} />
        })}
    </div>
}