import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom"
import { TaskLabels } from "../task-preview/task-labels"
import { TaskMembers } from "../task-preview/task-members"
import { boardService } from "../../services/board/board.service"


export const TaskPreview = ({ task, groupId, onArchiveTask }) => {
    const params = useParams()
    const { boardId } = params

    const [membersToDisplay, setMembersToDisplay] = useState(null)

    useEffect(() => {
        getMembersToDisplay()

    }, [])


    const getMembersToDisplay = async () => {
        const members = await boardService.getMembers()
        const filteredMembers = members.filter(member => task.members.includes(member._id))
        setMembersToDisplay(filteredMembers)
    }

    return <article className="task-preview">
        <Link to={`/board/${boardId}/${groupId}/${task.id}`}>
            {task.style?.bgColor && <section className="task-color"
                style={({ backgroundColor: task.style.bgColor })}
            ></section>}
            <div className="task-info">
                {task.labels?.length > 0 && <div className="task-label">
                    <TaskLabels labels={task.labels} />
                </div>}
                <section className="task-title">{task.title}</section>
                <section className="task-status flex space-between wrap">
                    <section className="badges">badges</section>
                    {membersToDisplay?.length > 0 && <section className="members flex">
                        <TaskMembers members={membersToDisplay} />
                    </section>}
                </section>
            </div>
        </Link>
    </article>
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