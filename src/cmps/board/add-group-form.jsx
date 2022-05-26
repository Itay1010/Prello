import React, { useState } from 'react';

export const AddGroupForm = () => {
    const [isEditing, setIsEditing] = useState(false)
    return <section className={`add-list-container ${isEditing ? 'editing' : ''}`} onSubmit={ev => {
        ev.preventDefault()
    }}>
        <a href="#" className="open-edit-btn" onClick={ev => setIsEditing(true)}>Add another list</a>
        <form className='add-list'>
            <input type="text" placeholder='Enter list title' />
            <button className='add-list-btn'>Add list</button>
            <a href="#"></a>
        </form>
    </section>
}