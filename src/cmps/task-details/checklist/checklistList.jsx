import React from 'react'
import { ChecklistItemPreview } from './checklist-item-preview.jsx'


export const ChecklistList = ({ checklist, saveChecklistTask, setIsDone, deleteClTask, deleteChecklist, boardMembers, generalTask, saveMemberToClTask }) => {


    return <div className='checklist-list'>
        {checklist.map(item => {
            // console.log(item.id)
            return <ChecklistItemPreview checklistId={item.id} key={item.id} item={item} saveChecklistTask={saveChecklistTask} setIsDone={setIsDone} deleteClTask={deleteClTask} deleteChecklist={deleteChecklist} boardMembers={boardMembers} generalTask={generalTask} saveMemberToClTask={saveMemberToClTask} />
        })}
    </div>
}