import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom"
import { TaskLabels } from "../task-preview/task-labels"
import { TaskMembers } from "../task-preview/task-members"
import { boardService } from "../../services/board/board.service"
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { TaskBadges } from '../task-preview/task-badges';



export const TaskPreview = ({ task, groupId, idx }) => {
    const params = useParams()
    const { boardId } = params

    const [membersToDisplay, setMembersToDisplay] = useState(null)

    useEffect(() => {
        getMembersToDisplay()

    }, [])


    const getMembersToDisplay = async () => {
        const members = await boardService.getMembers()
        if (!task.members) task.members = []
        const filteredMembers = members.filter(member => task.members.includes(member._id))
        setMembersToDisplay(filteredMembers)
    }
    // console.log(task);
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
            // style={_getStyle(provided.draggableProps.style, snapshot, provided)}
            >
                <Link to={`/board/${boardId}/${groupId}/${task.id}`}>
                    {task.style?.bgColor && <section className="task-color"
                        style={({ backgroundColor: task.style.bgColor })}
                    ></section>}
                    <div className="task-info">
                        {task.labels?.length > 0 && <div className="task-label">
                            <TaskLabels labels={task.labels} />
                        </div>}
                        {/* {task.checklist?.length > 0 && getClStatus(task)} */}
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

function _getStyle(style, snapshot) {

    if (!snapshot.isDragging) {
        return {
            ...style
        }
    }
    const { moveTo, curve, duration } = snapshot;
    const skew = `rotate(5deg)`;
    return {
        ...style,
        transform: `${style.transform} ${skew}`,

    }


}

// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from "react-router-dom"
// import { boardService } from "../../services/board/board.service"

// import { TaskLabels } from "../task-preview/task-labels"


// export const TaskPreview = ({ task, groupId, onArchiveTask }) => {
//     const [membersToDisplay, setMembersToDisplay] = useState(null)

//     useEffect(() => {
//         setMembersToDisplay(getMembersToDisplay())

//     }, [membersToDisplay])

//     // console.log(task);
//     const params = useParams()
//     const { boardId, taskId } = params

//     async function getMembersToDisplay() {
//         const members = await boardService.getMembers()
//         return members.filter(member => task.members.includes(member._id))
//     }




//     // if (!task) return <p>Loading...</p>
//     return <article className="task-preview">
//         <Link to={`/board/${boardId}/${groupId}/${taskId}`}>
//             {task.style?.bgColor && <section className="task-color"
//             // style={({ backgroundColor: task.style.bgColor })}
//             ></section>}
//             <div className="task-info">
//                 {task.labels && task.labels.length > 0 && <div className="task-label">
//                     <TaskLabels labels={task.labels} />
//                 </div>}
//                 <section className="task-title">{task.title}</section>
//                 <section className="task-status flex space-between wrap">
//                     <section className="badges">badges</section>
//                     {/* {task.members && task.members.length > 0 && <section className="members">
//                         <TaskPreview members={() => membersToDisplay()} />
//                     </section>} */}
//                     {/* {task.members && task.members.length > 0 && <section className="members">
//                         <TaskPreview members={membersToDisplay} />
//                     </section>} */}
//                 </section>
//             </div>
//         </Link>
//     </article>
// }