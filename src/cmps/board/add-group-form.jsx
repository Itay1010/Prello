import React, { useState } from 'react'

import { IAdd } from '../icons/i-add'

export const AddGroupForm = ({ handleSubmit }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [listTitle, setListTitle] = useState('')
    return <form
        className={`add-list-container ${isEditing ? 'editing' : ''}`}
        onSubmit={ev => {
            ev.preventDefault()
            if (!listTitle) return
            setListTitle('')
            ev.target.blur()
            setIsEditing(false)
            handleSubmit(listTitle)
        }}>
        <a href='#' className='open-edit-btn' onClick={ev => setIsEditing(true)}><IAdd /> Add another list</a>
        <section className={`add-list`} >
            {isEditing && <input type='text' placeholder='Enter list title' value={listTitle} autoFocus onChange={ev => setListTitle(ev.target.value)} />}
            <button className='add-list-btn' type='submit'>Add list</button>
            <a href='#' onClick={ev => setIsEditing(false)}></a>
        </section>
    </form>
}