import React from "react"


export const TaskPreview = ({ task }) => {
    console.log(task)
    return <article className="task-preview">
        <section className="task-color">task color</section>
        <section className="task-label"><div className="label"></div></section>
        <section className="task-title">{task.title}</section>
        <section className="task-status">status</section>
    </article>
}