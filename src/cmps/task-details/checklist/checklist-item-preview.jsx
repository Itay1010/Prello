import React, { useState } from 'react'
import { useForm } from '../../../hooks/useForm'



export const ChecklistItemPreview = ({ item, saveChecklistTask }) => {
    const [checklistTask, handleChange] = useForm(null)
    const [isInputOpen, setInput] = useState(false)
    // console.log(item.id)
    const onSaveChecklistTask = () => {
        const { txt } = checklistTask
        setInput(false)
        saveChecklistTask(txt, item.id)
    }

    const onToggleInput = () => {
        setInput(!isInputOpen)
    }

    const { title } = item

    return <div className='checklist-item-preview flex'>
        <div className='checklist-side-icons'>
            <div>icon</div>
            <span>%</span>
        </div>
        <div className='item-content flex'>
            <div className='checklist-item-header flex'>
                <h2>{title}</h2>
                <button>delete</button>
            </div>
            <div>% Bar</div>
            <div className='checklist-item-footer'>
                {!isInputOpen && <button onClick={onToggleInput}>Add an item</button>}
                {isInputOpen && <React.Fragment>
                    <form action="" onSubmit={onSaveChecklistTask} >
                        <input onChange={handleChange} onBlur={onToggleInput} type="text" placeholder='Add an item' name='txt' />
                        <button onMouseDown={onSaveChecklistTask}>Add item</button>
                    </form>
                </React.Fragment>}

            </div>
        </div>
    </div>
}