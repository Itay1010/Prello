import React, { useEffect, useState } from 'react';

import { boardService } from '../../../services/board/board.service'

export const Labels = ({ saveLabels, task }) => {
    const [taskToUpdate, setTaskToUpdate] = useState(task)
    const labels = boardService.getLabels()

    useEffect(() => {

    }, [taskToUpdate.labels])

    const toggleLabel = (label) => {
        if (taskToUpdate.labels) {
            if (taskToUpdate.labels.includes(label)) {
                const idx = taskToUpdate.labels.findIndex(currLabel => currLabel === label)
                taskToUpdate.labels.splice(idx, 1)
            } else taskToUpdate.labels.push(label)
        } else taskToUpdate.labels = [label]
        setTaskToUpdate(taskToUpdate)
        saveLabels(taskToUpdate)
    }

    return <section className='labels'>
        <button>x</button>
        <h2>Labels</h2>
        <hr />
        {/* <input onChange={(event) => handleChange(event)} type="text" value={filter} placeholder="Search members" /> */}
        {labels.map(label => {
            return <div className='label' key={label}>
                <div className='label-bar' onClick={() => toggleLabel(label)}
                // style={{ backgroundColor: label }}
                >
                    {taskToUpdate.labels?.includes(label) && <p>V</p>}
                </div>
                <button>E</button>
            </div>
        })}
    </section >
}