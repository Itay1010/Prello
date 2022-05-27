import React, { useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ClItemsList } from './cl-items-list.jsx'



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

    const { title, items } = item

    return <div className='checklist-item-preview'>

        <div className='item-content flex'>
            <div className='checklist-item-header flex'>
                <div>icon</div>
                <h2>{title}</h2>
                <button>delete</button>
            </div>
            <div>% Bar</div>
            <div className='checklist-item-list'>
                {items?.length > 0 && <ClItemsList items={items} />}



            </div>
            <div className='checklist-item-footer'>
                <div className='space2'>000</div>
                {!isInputOpen && <button onClick={onToggleInput}>Add an item</button>}
                {isInputOpen && <React.Fragment>
                    <form action="" onSubmit={onSaveChecklistTask} >
                        <input autoComplete='off' onChange={handleChange} onBlur={onToggleInput} type="text" placeholder='Add an item' name='txt' />
                        <button onMouseDown={onSaveChecklistTask}>Add item</button>
                    </form>
                </React.Fragment>}
            </div>
        </div>
    </div>
}