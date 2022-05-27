import React, { useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ClItemsList } from './cl-items-list.jsx'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';



export const ChecklistItemPreview = ({ item, saveChecklistTask, setIsDone, checklistId }) => {


    const { items, title } = item
    const checklistLength = items.length
    let checklistDoneLength = 0
    items.forEach(item => {
        if (item.isDone) checklistDoneLength++
        console.log(checklistDoneLength)
    })

    const [progress, setProgress] = useState(null);
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

    useEffect(() => {
        setProgress(checklistDoneLength)
    }, [checklistLength, checklistDoneLength])

    // const { title, items } = item
    return <div className='checklist-item-preview'>

        <div className='item-content flex'>
            <div className='checklist-item-header flex'>
                <div>icon</div>
                <h2>{title}</h2>
                <button>delete</button>
            </div>
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
            <div className='checklist-item-list'>
                {items?.length > 0 && <ClItemsList checklistId={checklistId} items={items} setIsDone={setIsDone} />}



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