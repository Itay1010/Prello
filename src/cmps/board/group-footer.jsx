import React from 'react';

export const GroupFooter = (props) => {
    console.log('GroupFooter - props', props)
    const {
        group,
        onAddTask,
        handleChange,
        newTask,
        setNewTask
    } = props
    return <React.Fragment>
        {/* {
            isTaskOpen || <div className="group-footer flex space-between align-center">
                <button className="add-card-btn" onClick={ev => setIsTaskOpen(true)
                }>Add a card</button>
            </div>
        }
        {
            isTaskOpen && <div className="group-footer flex align-center">
                <button onMouseDown={ev => {
                    onAddTask(newTask)
                    setNewTask({ title: '', groupId: group.id })
                }}>Add card</button>
                <button onClick={ev => setIsTaskOpen(false)}>X</button>
            </div>
        } */}
    </React.Fragment>

}