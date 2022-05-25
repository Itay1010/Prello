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

    return <section className="group flex col">
        <div className="group-header flex space-between">
            <TextareaAutosize
                maxLength="521"
                value={groupTitle.txt}
                onChange={ev => {
                    setGroupTitle(prevState => ({ ...prevState, txt: ev.target.value }))
                }}
                onBlur={ev => {
                    onGroupChange(groupTitle)
                }}
                onKeyDown={ev => {
                    if (ev.key === "Enter") {
                        ev.preventDefault()
                        ev.target.blur()
                        onGroupChange(groupTitle)
                    }
                }}></TextareaAutosize>
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
                    onBlur={ev => setIsTaskOpen(prevState => false)}
                    onKeyDown={ev => {
                        if (ev.key === "Enter") {
                            ev.preventDefault()
                            onAddTask(newTask)
                            setNewTask({ title: '', groupId: group.id })
                        }
                    }}
                ></TextareaAutosize>
            </article>}
        </div>
        {isTaskOpen || <div className="group-footer flex space-between align-center">
            <button onClick={ev => setIsTaskOpen(true)
            }>Add a card</button>
            <div className="add-media"></div>
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