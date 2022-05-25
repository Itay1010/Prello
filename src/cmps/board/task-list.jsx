import React, { useState } from "react"
import { TextareaAutosize } from '@mui/material';
import { TaskPreview } from "./task-preview"



export const Group = ({ group, onAddTask, onArchiveTask, onArchiveGroup }) => {
    const { tasks } = group

    const [newTask, setNewTask] = useState({ title: '', groupId: group.id })
    const [isTaskOpen, setIsTaskOpen] = useState(false)

    const handleChange = ({ target }) => {
        const { value, name } = target
        setNewTask(prevState => ({ ...prevState, [name]: value }))
        console.dir(target)
    }

    console.log(newTask)
    return <section className="group flex col">
        <div className="group-header flex space-between">
            <textarea maxLength="521">group's title</textarea>
            <div className="more" onClick={ev => {
                onArchiveGroup(group.id)
            }}></div>
        </div>
        <div className="list-task">
            {tasks.map(task => {
                if (task.archivedAt) return
                return <TaskPreview task={task} groupId={group.id} onArchiveTask={onArchiveTask} />
            })}
            {isTaskOpen && <article className="task-preview">
                <form id="add-card" onSubmit={ev => {
                    ev.preventDefault()
                    onAddTask(newTask)
                    setNewTask({ title: '', groupId: group.id })
                }}></form>
                <TextareaAutosize
                    minRows="3"
                    maxRows="10"
                    type="text"
                    autoComplete="off"
                    className="task-title"
                    name="title"
                    autoFocus
                    style={({ width: '100%' })}
                    // onBlur={ev => setIsTaskOpen(prevState => false)}
                    value={newTask.title}
                    placeholder="Enter a title for this card..."
                    onChange={handleChange}
                ></TextareaAutosize>
            </article>}
        </div>
        {isTaskOpen || <div className="group-footer flex space-between align-center">
            <button onClick={ev => setIsTaskOpen(true)
            }>Add a card</button>
            <div className="add-media"></div>
        </div>}
        {isTaskOpen && <div className="group-footer flex align-center">
            <button type="submit" form="add-card">Add card</button>
            <button onClick={ev => setIsTaskOpen(false)}>X</button>
        </div>}
    </section>
}