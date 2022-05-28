import React from 'react'
import { Group } from './task-list'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { AddGroupForm } from "./add-group-form"
import { GroupFooter } from './group-footer'



export const GroupList = ({ groups, eventHandlers }) => {
    const {
        onAddTask,
        onArchiveTask,
        onArchiveGroup,
        onGroupChange,
        onAddGroup
    } = eventHandlers
    return <Droppable type="groups" droppableId="groups" direction="horizontal">
        {(provided, snapshot) => {
            return <section
                className="group-container flex groups"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {groups.map((group, idx) => {
                    if (group.archivedAt) return
                    return <React.Fragment>
                        <Group
                            idx={idx}
                            key={group.id}
                            group={group}
                            onAddTask={onAddTask}
                            onArchiveTask={onArchiveTask}
                            onArchiveGroup={onArchiveGroup}
                            onGroupChange={onGroupChange}
                        />
                        {/* <GroupFooter
                            group={group}
                            onAddTask={onAddTask}
                            /> */}
                    </React.Fragment>

                })}
                {provided.placeholder}
                <AddGroupForm handleSubmit={onAddGroup} />
            </section>
        }
        }
    </Droppable>
}