import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'


import { Link, useParams } from "react-router-dom"
import { TaskLabels } from "../task-preview/task-labels"
import { TaskMembers } from "../task-preview/task-members"
import { Draggable } from 'react-beautiful-dnd';
import { TaskBadges } from '../task-preview/task-badges';
import { draggableStyle } from '../../services/board/draggable.style';


export const TaskPreview = ({ task, groupId, idx }) => {
    const params = useParams()
    const { boardId } = params
    const [membersToDisplay, setMembersToDisplay] = useState(null)
    const boardMembers = useSelector((storeState) => storeState.boardModule.board.members)

    // const taskPreviewRef = useRef()

    // useEffect(() => {
    //     taskPreviewRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    // }, [])

    useEffect(() => {
        getMembersToDisplay()

    }, [])

    const getMembersToDisplay = async () => {
        if (!task.members) task.members = []
        const filteredMembers = boardMembers.filter(member => task.members.includes(member._id))
        setMembersToDisplay(filteredMembers)
    }
    const getClStatus = (task) => {
        let total = 0
        let done = 0
        task.checklist.forEach(cl => {
            total += cl.items.length
            cl.items.forEach(item => {
                if (item.isDone) done++
            })
        })
        return `${done}/${total}`
    }

    return <Draggable type="cards" draggableId={task.id} index={idx}>
        {(provided, snapshot) => {
            return <article className="task-preview"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={draggableStyle.getStyle(provided.draggableProps.style, snapshot, provided)}
            >
                <Link to={`/board/${boardId}/${groupId}/${task.id}`}>
                    {task.style?.bgColor && <section className="task-color"
                        style={({ backgroundColor: task.style.bgColor })}
                    ></section>}
                    <div className="task-info">
                        {task.labels?.length > 0 && <div className="task-label">
                            <TaskLabels labels={task.labels} />
                        </div>}
                        <section className="task-title">{task.title}</section>
                        {(task.attachments?.length > 0 || task.members?.length > 0 ||
                            task.comments?.length > 0 || task.checklist?.length > 0 ||
                            task.description || task.members?.length > 0 || task.activities?.length > 0)
                            && <section className="task-status flex align-center space-between">
                                <TaskBadges task={task} getClStatus={getClStatus} />
                                {membersToDisplay?.length > 0 && <section className="members flex">
                                    <TaskMembers members={membersToDisplay} />
                                </section>}
                            </section>}

                    </div>
                </Link>
            </article>
        }}
    </Draggable>

}


