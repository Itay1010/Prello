import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { TaskPreview } from "./task-preview"
import { GroupTitle } from "./group-title"
import { AddTask } from "./add-task"


export const Group = ({ group, onAddTask, onArchiveTask, onArchiveGroup, onGroupChange, provided }) => {
    const { tasks } = group

    const [newTask, setNewTask] = useState({ title: '', groupId: group.id })
    const handleChange = ({ target }) => {
        const { value, name } = target
        setNewTask(prevState => ({ ...prevState, [name]: value }))
    }

    const [groupTitle, setGroupTitle] = useState({ txt: group.title, groupId: group.id })
    const [isTaskOpen, setIsTaskOpen] = useState(false)


    return <section
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="group flex col"
        onBlur={ev => setIsTaskOpen(prevState => false)}
    >
        <GroupTitle
            //Group header is just a textarea with two way data binding
            groupInfo={groupTitle}
            setGroupTitle={setGroupTitle}
            onArchiveGroup={onArchiveGroup}
            onGroupChange={onGroupChange}
        />
        <div className="list-task">
            {tasks.map(task => {
                if (!task.archivedAt) return <TaskPreview key={task.id} task={task} groupId={group.id} onArchiveTask={onArchiveTask} />
            })}
            {isTaskOpen && <AddTask
                // a card with the same class as the the others but with a textarea
                group={group}
                onAddTask={onAddTask}
                handleChange={handleChange}
                newTask={newTask}
                setNewTask={setNewTask}
            />}
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