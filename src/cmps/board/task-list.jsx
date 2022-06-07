import React, { useState, useRef, useEffect } from 'react'

import { Droppable, Draggable } from 'react-beautiful-dnd'
import { TaskPreview } from './task-preview'
import { GroupTitle } from './group-title'
import { AddTask } from './add-task'
import { IAdd } from '../icons/i-add'
import { draggableStyle } from '../../services/board/draggable.style'

export const Group = ({ group, onAddTask, onArchiveGroup, onGroupChange, onGroupColorChange, idx }) => {
    const [newTask, setNewTask] = useState({ title: '', groupId: group.id })
    useEffect(() => {
        setGroupTitle({ txt: group.title, groupId: group.id, color: group.color })
    }, [group])

    const { tasks } = group
    const handleChange = ({ target }) => {
        const { value, name } = target
        setNewTask(prevState => ({ ...prevState, [name]: value }))
    }

    const [groupTitle, setGroupTitle] = useState({ txt: group.title, groupId: group.id, color: group.color })
    const [isTaskOpen, setIsTaskOpen] = useState(false)

    // console.log('Group - groupTitle', groupTitle.color)
    return <Draggable type='groups' draggableId={group.id} index={idx}>
        {(provided, snapshot) => {
            return <section
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={draggableStyle.getStyle(provided.draggableProps.style, snapshot, provided, group.color)}
                className={`group flex col`}
            >
                <GroupTitle
                    groupInfo={groupTitle}
                    setGroupTitle={setGroupTitle}
                    onArchiveGroup={onArchiveGroup}
                    onGroupChange={onGroupChange}
                    onGroupColorChange={onGroupColorChange}
                />
                <Droppable type='cards' droppableId={`${group.id}`} direction='vertical'>
                    {(provided, snapshot) => {
                        return <React.Fragment>
                            <div className='list-task' {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks.map((task, idx) => {
                                    if (!task.archivedAt) return <TaskPreview key={task.id} task={task} groupId={group.id} idx={idx} />
                                })}
                                {snapshot.isDraggingOver && provided.placeholder}
                            </div>
                            {isTaskOpen && <AddTask
                                // a card with the same class as the the others but with a textarea
                                group={group}
                                onAddTask={onAddTask}
                                handleChange={handleChange}
                                newTask={newTask}
                                setNewTask={setNewTask}
                                setIsTaskOpen={setIsTaskOpen}
                            />}
                            {
                                isTaskOpen || <div className='group-footer flex align-center' >
                                    <button className='add-card-open-btn' onClick={ev => setIsTaskOpen(true)
                                    }><IAdd /> Add a card</button>
                                </div>
                            }
                            {
                                isTaskOpen && <div className='group-footer flex align-center'>
                                    <button className='add-card-btn' onMouseDown={ev => {
                                        onAddTask(newTask)
                                        setNewTask({ title: '', groupId: group.id })
                                        setTimeout(() => {
                                            setIsTaskOpen(true)
                                        }, 0)
                                    }}>Add card</button>
                                    <button onMouseDown={ev => {
                                        setIsTaskOpen(false)
                                        setNewTask({ title: '', groupId: group.id })
                                    }} className='add-card-close-btn'>{_getSVG()}</button>
                                </div>
                            }
                        </React.Fragment>
                    }}
                </Droppable>
            </section >
        }}

    </Draggable >
}

const _getSVG = () => {
    return <svg width='24' height='24' viewBox='0 0 24 24' ><path fillRule='evenodd' clipRule='evenodd' d='M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z' /></svg>
}