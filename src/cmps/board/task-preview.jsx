import React from "react"
import { Link, useParams } from "react-router-dom"


export const TaskPreview = ({ task, groupId, onArchiveTask }) => {
    const params = useParams()
    const { boardId } = params

    return <article className="task-preview">
        <Link to={`/board/${boardId}/${groupId}/${task.id}`}>
            {task.style?.bgColor && <section className="task-color"
            // style={({ backgroundColor: task.style.bgColor })}
            ></section>}
            <div className="task-info">
                {<div className="task-label">
                    <div className="label"></div>
                </div>}
                <section className="task-title">{task.title}</section>
                <section className="task-status flex space-between wrap">
                    <section className="badges">badges</section>
                    <section className="members">members</section>
                </section>
            </div>
        </Link>
    </article>
}