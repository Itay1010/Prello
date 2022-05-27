import React from 'react'
import { Group } from './task-list'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { AddGroupForm } from "./add-group-form"



export const GroupList = ({ groups, eventHandlers }) => {
    const {
        onAddTask,
        onArchiveTask,
        onArchiveGroup,
        onGroupChange,
        onAddGroup
    } = eventHandlers
    return <Droppable droppableId="groups" direction="horizontal">
        {(provided, snapshot) => {
            return <section
                className="group-container flex groups"
                {...provided.droppableProps}
                ref={provided.innerRef}
            // style={{ backgroundColor: snapshot.isDraggingOver ? 'red' : 'blue' }}

            >
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
                    />
                })}
                {provided.placeholder}
                <AddGroupForm handleSubmit={onAddGroup} />
            </section>
        }
        }
    </Droppable>
}