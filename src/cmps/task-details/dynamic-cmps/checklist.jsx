import React from 'react'


export const Checklist = ({ saveChecklist, group, closeModal }) => {


    const onCreateChecklist = (ev) => {
        ev.preventDefault()
        const { value } = ev.target.name
        saveChecklist(value)
    }


    return <div className='checklist'>
        <div className='close-modal flex justify-center align-center' onClick={() => closeModal()}>X</div>
        <h2>Checklist</h2>
        <hr />
        <h3>Title</h3>
        <form className='flex col' onSubmit={onCreateChecklist}>
            <input autoFocus autoComplete='off' type="text" placeholder='Checklist title' name='name' />
            <button >Save</button>
        </form>
    </div>
}