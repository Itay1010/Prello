import React from "react"

import { TaskPreview } from "./task-preview"


export const Group = ({ group }) => {
    const { tasks } = group
    console.log(group.tasks)
    return <section className="group flex col">
        <div className="group-header flex space-between">
            <textarea maxLength="521">group's title</textarea>
            <div className="more"></div>
        </div>
        <div className="list-task">
            {tasks.map(task => {
                return <TaskPreview task={task} />
            })}
        </div>
        <div className="group-footer flex space-between align-center">
            <a href="">Add a card</a>
            <div className="add-media"></div>
        </div>
    </section>
}