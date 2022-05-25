import React, { useState } from "react"

import { TaskPreview } from "./task-preview"


export const Group = ({ group, onAddTask }) => {
    const { tasks } = group

    const [newTask, setNewTask] = useState({ title: '', groupId: group.id })
    const [isTaskOpen, setIsTaskOpen] = useState(false)

    const handleChange = ({ target }) => {
        const { value, name } = target
        setNewTask(prevState => ({ ...prevState, [name]: value }))
    }

    console.log(newTask)
    return <section className="group flex col">
        <div className="group-header flex space-between">
            <textarea maxLength="521">group's title</textarea>
            <div className="more"></div>
        </div>
        <div className="list-task">
            {tasks.map(task => {
                return <TaskPreview task={task} />
            })}
            {isTaskOpen && <article className="task-preview">
                <form id="add-card" onSubmit={ev => {
                    ev.preventDefault()
                    onAddTask(newTask)
                    setNewTask({ title: '', groupId: group.id })
                }}></form>
                <textarea
                    type="text"
                    autoComplete="off"
                    className="task-title"
                    name="title"
                    style={({ width: '100%', height: "54px", overflowX: "hidden", overflowWrap: "break-word", wordBreak: "break-all" })}
                    onBlur={ev => setIsTaskOpen(false)}
                    value={newTask.title}
                    onChange={handleChange}
                ></textarea>
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