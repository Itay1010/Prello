import React, { useState } from "react"
import { TextareaAutosize } from '@mui/material'
import { TaskPreview } from "./task-preview"



export const Group = ({ group, onAddTask, onArchiveTask, onArchiveGroup, onGroupChange }) => {
    const { tasks } = group

    const [newTask, setNewTask] = useState({ title: '', groupId: group.id })
    const [groupTitle, setGroupTitle] = useState({ txt: group.title, groupId: group.id })
    const [isTaskOpen, setIsTaskOpen] = useState(false)

    const handleChange = ({ target }) => {
        const { value, name } = target
        setNewTask(prevState => ({ ...prevState, [name]: value }))
    }

    return <section className="group flex col" onBlur={ev => setIsTaskOpen(prevState => false)}>
        <div className="group-header flex space-between align-center">
            <TextareaAutosize
                maxLength="521"
                value={groupTitle.txt}
                onChange={ev => {
                    setGroupTitle(prevState => ({ ...prevState, txt: ev.target.value }))
                }}
                onBlur={ev => {
                    if (!groupTitle.txt) return
                    onGroupChange(groupTitle)
                }}
                onKeyDown={ev => {
                    if (ev.key === "Enter") {
                        ev.preventDefault()
                        ev.target.blur()
                    }
                }}></TextareaAutosize>
            <div className="more flex justify-center align-center" onClick={ev => { onArchiveGroup(group.id) }}>
                <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clipRule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" fill="currentColor" /></svg>
            </div>
        </div>
        <div className="list-task">
            {tasks.map(task => {
                if (task.archivedAt) return
                return <TaskPreview key={task.id} task={task} groupId={group.id} onArchiveTask={onArchiveTask} />
            })}
            {isTaskOpen && <article className="task-preview">
                <TextareaAutosize
                    minRows="3"
                    maxRows="10"
                    type="text"
                    autoComplete="off"
                    className="task-title"
                    name="title"
                    autoFocus
                    style={({ width: '100%' })}
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
            </article>}
        </div>
        {isTaskOpen || <div className="group-footer flex space-between align-center">
            <button className="add-card-btn" onClick={ev => setIsTaskOpen(true)
            }>Add a card</button>
        </div>}
        {isTaskOpen && <div className="group-footer flex align-center">
            <button onMouseDown={ev => {
                onAddTask(newTask)
                setNewTask({ title: '', groupId: group.id })
            }}>Add card</button>
            <button onClick={ev => setIsTaskOpen(false)}>X</button>
        </div>}
    </section >
}