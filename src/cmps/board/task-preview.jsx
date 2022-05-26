import React from "react"
import { Link, useParams } from "react-router-dom"


export const TaskPreview = ({ task, groupId, onArchiveTask }) => {
    const params = useParams()
    const { boardId } = params

    return <article className="task-preview">
        <Link to={`/board/${boardId}/${groupId}/${task.id}`}>
            {task.style?.bgColor && <section className="task-color" style={({ backgroundColor: task.style.bgColor })}></section>}
            {task.labelIds && <section className="task-label"><div className="label"></div></section>}
            <section className="task-title">{task.title}</section>
            {/* <section className="task-status">
                <section></section>
                <section></section>
            </section> */}
        </Link>
        <button onClick={ev => onArchiveTask({ taskId: task.id, groupId })}>Archive card</button>

    </article>
}