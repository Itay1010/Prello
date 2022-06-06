import React, { useEffect, useState } from 'react'

import { useForm } from '../../../hooks/useForm'
import { ClItemsList } from './cl-items-list.jsx'

import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

import { IChecklist } from '../../icons/i-checklist.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#5BA4D0',
        },
    }
})

export const ChecklistItemPreview = ({ item, saveChecklistTask, setIsDone, checklistId, deleteClTask, deleteChecklist, boardMembers, generalTask, saveMemberToClTask }) => {

    const { items, title } = item
    const checklistLength = items.length
    let checklistDoneLength = 0
    items.forEach(item => {
        if (item.isDone) checklistDoneLength++
    })

    const donePercentage = checklistDoneLength / checklistLength * 100

    const [progress, setProgress] = useState(0)
    const [checklistTask, handleChange] = useForm(null)
    const [isInputOpen, setInput] = useState(false)
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

    }

    const onDeleteChecklist = () => {
        deleteChecklist(checklistId)
    }

    const onSaveMemberToClTask = (member, clTaskId) => {
        saveMemberToClTask(member, clTaskId, item)
    }

    useEffect(() => {
        setProgress(donePercentage)
    }, [checklistLength, checklistDoneLength])

    return <div className='checklist-item-preview'>

        <div className='item-content flex'>
            <div className='checklist-item-header flex'>
                <div className='icon-wrapper'><IChecklist /></div>
                <div className='header-details-wrapper'>
                    <h2>{title}</h2>
                    <button onClick={onDeleteChecklist}>Delete</button>
                </div>
            </div>
            <div className='percentage-bar'>
                <div className='percentage-num-wrapper'>
                    <span className='percent-num'>{!donePercentage ? 0 : Math.floor(donePercentage)}%</span>
                </div>
                <ThemeProvider theme={theme}>
                    <Box sx={{
                        width: '100%',
                    }}>
                        <LinearProgress variant='determinate' value={progress} sx={{
                            borderRadius: 75,
                            height: 8,
                            width: '100%',
                            color: 'red',
                            backgroundColor: '#091e4214'
                        }} />
                    </Box>
                </ThemeProvider>
            </div>
            <div className='checklist-item-list'>
                {items?.length > 0 && <ClItemsList checklistId={checklistId} items={items} setIsDone={setIsDone} deleteClTask={onDeleteClTask} boardMembers={boardMembers} generalTask={generalTask} saveMemberToClTask={onSaveMemberToClTask} />}

            </div>
            <div className='checklist-item-footer'>
                {!isInputOpen && <button onClick={onToggleInput}>Add an item</button>}
                {isInputOpen && <React.Fragment>
                    <form action='' onSubmit={onSaveChecklistTask} >
                        <input autoComplete='off' onChange={handleChange} autoFocus onBlur={onToggleInput} type='text' placeholder='Add an item' name='txt' />
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