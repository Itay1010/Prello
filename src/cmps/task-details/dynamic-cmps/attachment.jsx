import React from 'react'

export const Attachment = ({ saveAttachment }) => {

    const onSaveAttachment = (ev) => {
        ev.preventDefault()
        const { target } = ev
        const { value } = target.name
        saveAttachment(value)
    }




    return <div className='modal-type'>
        <h4>Title</h4>
        <form onSubmit={onSaveAttachment}>
            <input type="text" placeholder='Enter img url' name='name' />
            <button>Save</button>
        </form>
    </div>
}
