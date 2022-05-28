import React, { useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ClItemsList } from './cl-items-list.jsx'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';



export const ChecklistItemPreview = ({ item, saveChecklistTask, setIsDone, checklistId, deleteClTask, deleteChecklist }) => {

    const { items, title } = item
    const checklistLength = items.length
    let checklistDoneLength = 0
    items.forEach(item => {
        if (item.isDone) checklistDoneLength++
        // console.log(checklistDoneLength)
    })

    const donePercentage = checklistDoneLength / checklistLength * 100

    const [progress, setProgress] = useState(0);
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

    const onDeleteClTask = (clTaskId) => {
        deleteClTask(clTaskId, item)
        // console.log(clTaskId, item)

    }

    const onDeleteChecklist = () => {
        deleteChecklist(checklistId)
    }

    useEffect(() => {
        setProgress(donePercentage)
    }, [checklistLength, checklistDoneLength])

    // const { title, items } = item
    return <div className='checklist-item-preview'>

        <div className='item-content flex'>
            <div className='checklist-item-header flex'>
                <div>icon</div>
                <div className='header-details-wrapper'>
                    <h2>{title}</h2>
                    <button onClick={onDeleteChecklist}>delete</button>
                </div>
            </div>
            <div className='percentage-bar'>
                <span>{Math.floor(donePercentage)}%</span>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress variant="determinate" value={progress} />
                </Box>
            </div>
            <div className='checklist-item-list'>
                {items?.length > 0 && <ClItemsList checklistId={checklistId} items={items} setIsDone={setIsDone} deleteClTask={onDeleteClTask} />}



            </div>
            <div className='checklist-item-footer'>
                {!isInputOpen && <button onClick={onToggleInput}>Add an item</button>}
                {isInputOpen && <React.Fragment>
                    <form action="" onSubmit={onSaveChecklistTask} >
                        <input autoComplete='off' onChange={handleChange} onBlur={onToggleInput} type="text" placeholder='Add an item' name='txt' />
                        <div className='toggle-modal-buttons'>
                            <button onMouseDown={onSaveChecklistTask}>Add</button>
                            <button onMouseDown={onToggleInput}>Cancel</button>
                        </div>
                    </form>
                </React.Fragment>}
            </div>
        </div>
    </div>
}