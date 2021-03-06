import React from 'react'

import { Group } from './task-list'
import { Droppable } from 'react-beautiful-dnd'
import { AddGroupForm } from './add-group-form'

export const GroupList = ({ groups, eventHandlers }) => {
    const {
        onAddTask,
        onArchiveTask,
        onArchiveGroup,
        onGroupChange,
        onAddGroup,
        onGroupColorChange
    } = eventHandlers
    return <Droppable type='groups' droppableId='groups' direction='horizontal'>
        {(provided, snapshot) => {
            return <section
                className='group-container flex groups'
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {groups.map((group, idx) => {
                    if (group.archivedAt) return
                    return <Group
                        idx={idx}
                        key={group.id}
                        group={group}
                        onAddTask={onAddTask}
                        onArchiveTask={onArchiveTask}
                        onArchiveGroup={onArchiveGroup}
                        onGroupChange={onGroupChange}
                        onGroupColorChange={onGroupColorChange}
                    />
                })}
                {provided.placeholder}
                <AddGroupForm handleSubmit={onAddGroup} />
            </section>
        }
        }
    </Droppable>
}