import React from 'react'


export const Checklist = ({ saveChecklist, group }) => {


    const onCreateChecklist = (ev) => {
        ev.preventDefault()
        const { value } = ev.target.name
        saveChecklist(value)
    }


    return <div className='modal-type'>
        <h4>Title</h4>
        <form action="" onSubmit={onCreateChecklist}>
            <input type="text" placeholder='Checklist title' name='name' />
            <button >Save</button>
        </form>
    </div>
}