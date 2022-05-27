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
            <input autoComplete='off' type="text" placeholder='Enter img url' name='name' onChange={() => console.log('yalla balagan')} />
            <button>Save</button>
        </form>
    </div>
}
