import React, { useEffect, useState } from 'react'

import { IChecklist } from '../../icons/i-checklist.jsx';

import { ChecklistPreview } from './checklist-item-preview.jsx'


export const ChecklistList = ({ checklist, saveChecklistTask, setIsDone, deleteClTask, deleteChecklist }) => {
    // console.log(checklist);

    const [taskCLs, settaskCLs] = useState(null)

    useEffect(() => {
        settaskCLs(checklist)
        getTodoById('Cll1lC4JMohjfbPA1', 'EyZVAO9XwgnFkDx')
    }, [])


    useEffect(() => {

    }, [taskCLs])


    const getTodoById = async (clId, todoId) => {
        const cl = await taskCLs.filter(cl => cl.id === clId)
        const todo = await cl[0].items.find(todo => todo.id === todoId)
        return todo
    }

    const toggleIsDone = async (clId, todoId) => {
        const todo = await getTodoById(clId, todoId)
        console.log(todo);
        todo.isDone = !todo.isDone

    }



    if (!taskCLs || taskCLs.length === 0) return <React.Fragment></React.Fragment>
    return <div className='checklist'>
        {taskCLs.map(cl => {
            return <div className={`cl-${cl.id} flex col`} key={cl.id}>
                <div className="cl-header flex">
                    <IChecklist />
                    <h2>{cl.title}</h2>
                </div>
                <div className='cl-bar'>

                </div>
                {cl.items.map(todo => {
                    return <div className='todo flex' key={todo.id}>
                        <input type="checkbox" onChange={() => toggleIsDone(cl.id, todo.id)} checked={todo.isDone ? 'checked' : ''} />
                        {/* <input type="checkbox" onChange={toggleIsDone} checked={todo.isDone ? 'checked' : ''} /> */}
                        <p>{todo.txt}</p>
                    </div>
                })}
            </div>

        })}
    </div>
}