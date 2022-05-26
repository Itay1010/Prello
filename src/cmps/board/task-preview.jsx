import React from "react"
import { Link } from "react-router-dom"


export const TaskPreview = ({ task, groupId, onArchiveTask }) => {

    return <article className="task-preview">
        {/* <Link to={'/task/' + task.id}> */}
        <section className="task-color">task color</section>
        <section className="task-label"><div className="label"></div></section>
        <section className="task-title">{task.title}</section>
        <section className="task-status">status</section>
        {/* </Link> */}
        <button onClick={ev => onArchiveTask({ taskId: task.id, groupId })}>Archive card</button>
    </article>
}