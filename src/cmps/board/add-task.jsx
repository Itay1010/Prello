import React, { useState } from 'react';
import { TextareaAutosize } from '@mui/material'

export const AddTask = ({ group, onAddTask, newTask, handleChange, setNewTask }) => {

    
    return <article className="task-preview add-task">
        <TextareaAutosize
            minRows="3"
            maxRows="10"
            type="text"
            autoComplete="off"
            className="task-title"
            name="title"
            autoFocus
            // style={({ width: '100%' })}
            value={newTask.title}
            placeholder="Enter a title for this card..."
            onChange={handleChange}
            onKeyDown={ev => {
                if (ev.key === "Enter") {
                    ev.preventDefault()
                    if (newTask.title) {
                        onAddTask(newTask)
                        setNewTask({ title: '', groupId: group.id })
                    }
                }
            }}
        ></TextareaAutosize>
    </article>
}